import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Briefcase, 
  MapPin, 
  Building2, 
  Clock,
  DollarSign,
  Users,
  Search,
  Filter,
  Plus,
  ExternalLink,
  BookmarkPlus,
  Zap,
  Calendar,
  TrendingUp
} from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  experience: string;
  salary: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedBy: string;
  postedDate: Date;
  deadline: Date;
  applicants: number;
  category: string;
  remote: boolean;
  urgent: boolean;
}

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'Google Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    experience: '5+ years',
    salary: '$150,000 - $200,000',
    description: 'Join our team to build innovative products that impact billions of users worldwide. Work on cutting-edge technologies and solve complex problems.',
    requirements: ['React', 'Node.js', 'TypeScript', 'Cloud Platforms'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Stock Options', 'Remote Work'],
    postedBy: 'Sarah Johnson',
    postedDate: new Date('2024-04-15'),
    deadline: new Date('2024-05-30'),
    applicants: 45,
    category: 'Technology',
    remote: true,
    urgent: false,
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Microsoft Corporation',
    location: 'Seattle, WA',
    type: 'full-time',
    experience: '3-5 years',
    salary: '$90,000 - $120,000',
    description: 'Lead marketing campaigns for our cloud products. Collaborate with cross-functional teams to drive growth and engagement.',
    requirements: ['Digital Marketing', 'Analytics', 'Campaign Management', 'B2B Experience'],
    benefits: ['Comprehensive Health Coverage', 'Professional Development', 'Flexible PTO'],
    postedBy: 'Michael Chen',
    postedDate: new Date('2024-04-20'),
    deadline: new Date('2024-06-01'),
    applicants: 32,
    category: 'Marketing',
    remote: false,
    urgent: true,
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Tesla Inc.',
    location: 'Austin, TX',
    type: 'internship',
    experience: 'Entry Level',
    salary: '$25 - $35 per hour',
    description: 'Work with our data science team on autonomous driving algorithms and battery optimization projects.',
    requirements: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    benefits: ['Mentorship Program', 'Learning Stipend', 'Free Lunch'],
    postedBy: 'Dr. Emily Rodriguez',
    postedDate: new Date('2024-04-25'),
    deadline: new Date('2024-05-15'),
    applicants: 128,
    category: 'Data Science',
    remote: true,
    urgent: false,
  },
  {
    id: '4',
    title: 'Financial Analyst',
    company: 'Goldman Sachs',
    location: 'New York, NY',
    type: 'full-time',
    experience: '1-3 years',
    salary: '$95,000 - $130,000',
    description: 'Analyze financial data, create models, and provide insights to support investment decisions.',
    requirements: ['Financial Modeling', 'Excel', 'Bloomberg Terminal', 'CFA Preferred'],
    benefits: ['Bonus Structure', 'Health & Dental', 'Retirement Plan', 'Continuing Education'],
    postedBy: 'James Wilson',
    postedDate: new Date('2024-04-18'),
    deadline: new Date('2024-05-25'),
    applicants: 67,
    category: 'Finance',
    remote: false,
    urgent: false,
  },
];

interface JobPortalProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
}

export const JobPortal = ({ currentRole }: JobPortalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showRemoteOnly, setShowRemoteOnly] = useState(false);

  const categories = [...new Set(sampleJobs.map(job => job.category))];
  const jobTypes = ['full-time', 'part-time', 'contract', 'internship'];

  const filteredJobs = sampleJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || job.category === selectedCategory;
    const matchesType = !selectedType || job.type === selectedType;
    const matchesRemote = !showRemoteOnly || job.remote;
    
    return matchesSearch && matchesCategory && matchesType && matchesRemote;
  });

  const urgentJobs = filteredJobs.filter(job => job.urgent);
  const regularJobs = filteredJobs.filter(job => !job.urgent);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getDaysLeft = (deadline: Date) => {
    const today = new Date();
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'full-time': 'bg-primary text-primary-foreground',
      'part-time': 'bg-secondary text-secondary-foreground',
      'contract': 'bg-warning text-warning-foreground',
      'internship': 'bg-success text-success-foreground',
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-success-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job & Internship Portal</h1>
            <p className="text-muted-foreground">Discover opportunities from alumni and partners</p>
          </div>
        </div>
        
        {(currentRole === 'alumni' || currentRole === 'admin') && (
          <Button variant="professional">
            <Plus className="h-4 w-4 mr-2" />
            Post a Job
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Find Your Next Opportunity</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </option>
              ))}
            </select>
            
            <Button 
              variant={showRemoteOnly ? "default" : "outline"}
              onClick={() => setShowRemoteOnly(!showRemoteOnly)}
            >
              Remote Only
            </Button>
            
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{sampleJobs.length}</div>
            <div className="text-sm text-muted-foreground">Total Jobs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="text-sm text-muted-foreground">New This Week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">89%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">45</div>
            <div className="text-sm text-muted-foreground">Remote Jobs</div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Jobs */}
      {urgentJobs.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Zap className="h-5 w-5 text-warning" />
            <h2 className="text-2xl font-bold text-foreground">Urgent Openings</h2>
            <Badge variant="destructive">Limited Time</Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {urgentJobs.map((job) => (
              <Card key={job.id} className="group hover:shadow-xl transition-all duration-300 border-warning/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(job.type)}>
                          {job.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                        {job.remote && (
                          <Badge variant="outline" className="border-success text-success">
                            Remote
                          </Badge>
                        )}
                        <Badge variant="destructive" className="animate-pulse">
                          <Zap className="h-3 w-3 mr-1" />
                          Urgent
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {job.title}
                      </CardTitle>
                      <p className="text-muted-foreground flex items-center space-x-1">
                        <Building2 className="h-4 w-4" />
                        <span>{job.company}</span>
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{job.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-success">{job.salary}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Deadline: {formatDate(job.deadline)}</span>
                      <Badge variant="destructive">
                        {getDaysLeft(job.deadline)} days left
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                          {getInitials(job.postedBy)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">Posted by {job.postedBy}</span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <BookmarkPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="professional" size="sm">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Jobs */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">All Opportunities</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {regularJobs.map((job) => (
            <Card key={job.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getTypeColor(job.type)}>
                    {job.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </Badge>
                  {job.remote && (
                    <Badge variant="outline" className="border-success text-success">
                      Remote
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {job.title}
                </CardTitle>
                <p className="text-muted-foreground flex items-center space-x-1">
                  <Building2 className="h-3 w-3" />
                  <span>{job.company}</span>
                </p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-3 w-3 text-muted-foreground" />
                    <span className="font-semibold text-success">{job.salary}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{job.experience}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {job.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {job.applicants} applicants
                  </span>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <BookmarkPlus className="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          Load More Jobs
        </Button>
      </div>
    </div>
  );
};