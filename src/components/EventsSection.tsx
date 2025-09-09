import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  ExternalLink,
  Plus,
  Filter,
  Video,
  Building2,
  Star,
  ChevronRight
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  type: 'webinar' | 'reunion' | 'networking' | 'career' | 'social';
  isVirtual: boolean;
  maxAttendees: number;
  currentAttendees: number;
  organizer: string;
  organizerAvatar?: string;
  featured: boolean;
  registrationDeadline: Date;
  tags: string[];
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: 'Annual Alumni Reunion 2024',
    description: 'Join us for our biggest alumni gathering of the year! Reconnect with classmates, share memories, and celebrate achievements.',
    date: new Date('2024-06-15'),
    time: '6:00 PM - 11:00 PM',
    location: 'University Main Campus, Grand Hall',
    type: 'reunion',
    isVirtual: false,
    maxAttendees: 500,
    currentAttendees: 347,
    organizer: 'Alumni Affairs Office',
    featured: true,
    registrationDeadline: new Date('2024-06-01'),
    tags: ['Reunion', 'Networking', 'Celebration'],
  },
  {
    id: '2',
    title: 'Tech Industry Career Webinar',
    description: 'Learn about the latest trends in tech, career opportunities, and get insights from successful alumni in major tech companies.',
    date: new Date('2024-05-20'),
    time: '2:00 PM - 3:30 PM',
    location: 'Online',
    type: 'webinar',
    isVirtual: true,
    maxAttendees: 1000,
    currentAttendees: 678,
    organizer: 'Sarah Johnson',
    organizerAvatar: '',
    featured: true,
    registrationDeadline: new Date('2024-05-18'),
    tags: ['Career', 'Technology', 'Professional Development'],
  },
  {
    id: '3',
    title: 'Startup Founders Networking Night',
    description: 'An exclusive evening for alumni entrepreneurs and aspiring founders to connect, share experiences, and explore collaborations.',
    date: new Date('2024-05-25'),
    time: '7:00 PM - 10:00 PM',
    location: 'Innovation Hub, Downtown',
    type: 'networking',
    isVirtual: false,
    maxAttendees: 75,
    currentAttendees: 52,
    organizer: 'Michael Chen',
    featured: false,
    registrationDeadline: new Date('2024-05-23'),
    tags: ['Entrepreneurship', 'Networking', 'Innovation'],
  },
  {
    id: '4',
    title: 'Healthcare Alumni Panel Discussion',
    description: 'Join our distinguished healthcare alumni as they discuss industry challenges, innovations, and career paths in medical fields.',
    date: new Date('2024-06-05'),
    time: '1:00 PM - 2:30 PM',
    location: 'Medical School Auditorium',
    type: 'career',
    isVirtual: false,
    maxAttendees: 200,
    currentAttendees: 89,
    organizer: 'Dr. Emily Rodriguez',
    featured: false,
    registrationDeadline: new Date('2024-06-03'),
    tags: ['Healthcare', 'Panel', 'Career Guidance'],
  },
];

interface EventsSectionProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
}

export const EventsSection = ({ currentRole }: EventsSectionProps) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [viewMode, setViewMode] = useState<'upcoming' | 'past'>('upcoming');

  const eventTypes = [
    { value: '', label: 'All Events' },
    { value: 'reunion', label: 'Reunions' },
    { value: 'webinar', label: 'Webinars' },
    { value: 'networking', label: 'Networking' },
    { value: 'career', label: 'Career' },
    { value: 'social', label: 'Social' },
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      reunion: 'bg-secondary text-secondary-foreground',
      webinar: 'bg-primary text-primary-foreground',
      networking: 'bg-success text-success-foreground',
      career: 'bg-warning text-warning-foreground',
      social: 'bg-muted text-muted-foreground',
    };
    return colors[type as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const filteredEvents = sampleEvents.filter(event => {
    const matchesType = !selectedType || event.type === selectedType;
    const isUpcoming = event.date > new Date();
    const matchesView = viewMode === 'upcoming' ? isUpcoming : !isUpcoming;
    return matchesType && matchesView;
  });

  const featuredEvents = filteredEvents.filter(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getAttendancePercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
            <Calendar className="h-6 w-6 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Events & Webinars</h1>
            <p className="text-muted-foreground">Connect, learn, and grow together</p>
          </div>
        </div>
        
        {currentRole === 'admin' && (
          <Button variant="professional">
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'upcoming' ? 'default' : 'outline'}
            onClick={() => setViewMode('upcoming')}
          >
            Upcoming Events
          </Button>
          <Button 
            variant={viewMode === 'past' ? 'default' : 'outline'}
            onClick={() => setViewMode('past')}
          >
            Past Events
          </Button>
        </div>
        
        <div className="flex space-x-2 flex-wrap">
          {eventTypes.map(type => (
            <Button
              key={type.value}
              variant={selectedType === type.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedType(type.value)}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Events */}
      {featuredEvents.length > 0 && (
        <div className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Star className="h-5 w-5 text-secondary" />
            <h2 className="text-2xl font-bold text-foreground">Featured Events</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredEvents.map((event) => (
              <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 border-secondary/20">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getTypeColor(event.type)} variant="secondary">
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Badge>
                        {event.isVirtual && (
                          <Badge variant="outline" className="border-primary text-primary">
                            <Video className="h-3 w-3 mr-1" />
                            Virtual
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {event.title}
                      </CardTitle>
                    </div>
                    <Star className="h-5 w-5 text-secondary fill-secondary" />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {event.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatDate(event.date)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      {event.isVirtual ? (
                        <Video className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{event.location}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{event.currentAttendees} / {event.maxAttendees} registered</span>
                      <div className="flex-1 bg-muted rounded-full h-2 ml-2">
                        <div 
                          className="bg-success rounded-full h-2 transition-all duration-300"
                          style={{ width: `${getAttendancePercentage(event.currentAttendees, event.maxAttendees)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={event.organizerAvatar} alt={event.organizer} />
                        <AvatarFallback className="text-xs">
                          {event.organizer.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">by {event.organizer}</span>
                    </div>
                    
                    <Button variant="professional" size="sm">
                      Register Now
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Regular Events */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">All Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularEvents.map((event) => (
            <Card key={event.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge className={getTypeColor(event.type)} variant="secondary">
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </Badge>
                  {event.isVirtual && (
                    <Badge variant="outline" className="border-primary text-primary">
                      <Video className="h-3 w-3 mr-1" />
                      Virtual
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {event.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {event.isVirtual ? (
                      <Video className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                    )}
                    <span className="truncate">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span>{event.currentAttendees} registered</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    by {event.organizer}
                  </span>
                  <Button variant="outline" size="sm">
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No Events Found</h3>
          <p className="text-muted-foreground mb-4">
            {viewMode === 'upcoming' 
              ? "There are no upcoming events matching your criteria." 
              : "No past events found for the selected filters."
            }
          </p>
          {currentRole === 'admin' && (
            <Button variant="professional">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Event
            </Button>
          )}
        </div>
      )}
    </div>
  );
};