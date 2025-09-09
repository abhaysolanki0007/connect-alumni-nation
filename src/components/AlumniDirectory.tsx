import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, 
  MapPin, 
  Building2, 
  Calendar,
  ExternalLink,
  MessageCircle,
  Filter,
  Users,
  Briefcase
} from 'lucide-react';

interface Alumni {
  id: string;
  name: string;
  email: string;
  graduationYear: number;
  degree: string;
  currentPosition: string;
  company: string;
  location: string;
  industry: string;
  linkedin: string;
  achievements: string[];
  isAvailableForMentorship: boolean;
  profileImage?: string;
}

const sampleAlumni: Alumni[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    graduationYear: 2018,
    degree: 'Computer Science',
    currentPosition: 'Senior Software Engineer',
    company: 'Google',
    location: 'San Francisco, CA',
    industry: 'Technology',
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    achievements: ['Tech Lead of the Year 2023', 'Published 15+ Research Papers'],
    isAvailableForMentorship: true,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@email.com',
    graduationYear: 2015,
    degree: 'Business Administration',
    currentPosition: 'VP of Marketing',
    company: 'Microsoft',
    location: 'Seattle, WA',
    industry: 'Technology',
    linkedin: 'https://linkedin.com/in/michaelchen',
    achievements: ['Marketing Excellence Award', '40 Under 40 Recognition'],
    isAvailableForMentorship: true,
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    email: 'emily.rodriguez@email.com',
    graduationYear: 2012,
    degree: 'Biomedical Engineering',
    currentPosition: 'Chief Medical Officer',
    company: 'BioTech Innovations',
    location: 'Boston, MA',
    industry: 'Healthcare',
    linkedin: 'https://linkedin.com/in/emilyrodriguez',
    achievements: ['FDA Drug Approval Lead', 'Medical Innovation Award'],
    isAvailableForMentorship: false,
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@email.com',
    graduationYear: 2020,
    degree: 'Finance',
    currentPosition: 'Investment Analyst',
    company: 'Goldman Sachs',
    location: 'New York, NY',
    industry: 'Finance',
    linkedin: 'https://linkedin.com/in/jameswilson',
    achievements: ['Top Performer 2023', 'CFA Charter Holder'],
    isAvailableForMentorship: true,
  },
];

interface AlumniDirectoryProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
}

export const AlumniDirectory = ({ currentRole }: AlumniDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const industries = [...new Set(sampleAlumni.map(alumni => alumni.industry))];
  const graduationYears = [...new Set(sampleAlumni.map(alumni => alumni.graduationYear))].sort((a, b) => b - a);

  const filteredAlumni = sampleAlumni.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = !selectedIndustry || alumni.industry === selectedIndustry;
    const matchesYear = !selectedYear || alumni.graduationYear.toString() === selectedYear;
    
    return matchesSearch && matchesIndustry && matchesYear;
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Alumni Directory</h1>
            <p className="text-muted-foreground">Connect with {sampleAlumni.length.toLocaleString()}+ alumni worldwide</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Search & Filter</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search alumni..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Years</option>
              {graduationYears.map(year => (
                <option key={year} value={year.toString()}>{year}</option>
              ))}
            </select>
            
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-muted-foreground">
          Showing {filteredAlumni.length} of {sampleAlumni.length} alumni
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Grid View
          </Button>
          <Button variant="ghost" size="sm">
            List View
          </Button>
        </div>
      </div>

      {/* Alumni Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alumni) => (
          <Card key={alumni.id} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
            <CardContent className="p-6">
              {/* Profile Header */}
              <div className="flex items-start space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={alumni.profileImage} alt={alumni.name} />
                  <AvatarFallback className="bg-gradient-primary text-primary-foreground text-lg font-semibold">
                    {getInitials(alumni.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {alumni.name}
                  </h3>
                  <p className="text-muted-foreground">{alumni.currentPosition}</p>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                    <Building2 className="h-3 w-3" />
                    <span>{alumni.company}</span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>Class of {alumni.graduationYear} • {alumni.degree}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{alumni.location}</span>
                </div>
              </div>

              {/* Industry Badge */}
              <div className="mb-4">
                <Badge variant="secondary" className="mr-2">
                  {alumni.industry}
                </Badge>
                {alumni.isAvailableForMentorship && (
                  <Badge variant="outline" className="border-success text-success">
                    Mentoring Available
                  </Badge>
                )}
              </div>

              {/* Achievements */}
              {alumni.achievements.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Recent Achievements:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {alumni.achievements.slice(0, 2).map((achievement, index) => (
                      <li key={index} className="flex items-start space-x-1">
                        <span className="text-success mt-1">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="h-3 w-3 mr-1" />
                  Connect
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={alumni.linkedin} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Alumni
        </Button>
      </div>
    </div>
  );
};