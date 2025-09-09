import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/hero-alumni.jpg';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Heart, 
  Award,
  TrendingUp,
  MapPin,
  ArrowRight
} from 'lucide-react';

interface HeroProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
  onGetStarted: () => void;
}

export const Hero = ({ currentRole, onGetStarted }: HeroProps) => {
  const stats = [
    { icon: Users, label: 'Alumni', value: '12,500+', color: 'text-primary' },
    { icon: Briefcase, label: 'Job Placements', value: '8,900+', color: 'text-success' },
    { icon: Heart, label: 'Donations Raised', value: '$2.4M', color: 'text-secondary' },
    { icon: Award, label: 'Success Stories', value: '450+', color: 'text-warning' },
  ];

  const features = [
    {
      icon: Users,
      title: 'Alumni Network',
      description: 'Connect with 12,500+ alumni across 80+ countries and industries.',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Calendar,
      title: 'Events & Reunions',
      description: 'Join exclusive events, webinars, and reunions organized throughout the year.',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Briefcase,
      title: 'Career Portal',
      description: 'Access job opportunities and career guidance from industry professionals.',
      gradient: 'bg-gradient-success'
    },
    {
      icon: Heart,
      title: 'Give Back',
      description: 'Support scholarships and university development through secure donations.',
      gradient: 'bg-gradient-primary'
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-20 text-primary-foreground">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/90"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-secondary/20 text-secondary-foreground mb-6 px-4 py-2">
              <MapPin className="h-4 w-4 mr-2" />
              University Alumni Network
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connect. Grow. 
              <span className="bg-gradient-to-r from-secondary to-secondary-light bg-clip-text text-transparent">
                {' '}Give Back.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Join the largest alumni network of our university. Discover opportunities, 
              find mentors, and help shape the future of education.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                variant="premium" 
                size="lg" 
                onClick={onGetStarted}
                className="min-w-[200px]"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="min-w-[200px] border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Explore Features
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map(({ icon: Icon, label, value, color }) => (
                <Card key={label} className="bg-primary-foreground/10 border-primary-foreground/20">
                  <CardContent className="p-4 text-center">
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${color}`} />
                    <div className="text-2xl font-bold text-primary-foreground">{value}</div>
                    <div className="text-sm text-primary-foreground/80">{label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Stay Connected
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform brings alumni, students, and opportunities together in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description, gradient }) => (
              <Card key={title} className="group hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${gradient} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-muted py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Connect with Your Alumni Network?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of alumni who are already benefiting from our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg" onClick={onGetStarted}>
              <TrendingUp className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};