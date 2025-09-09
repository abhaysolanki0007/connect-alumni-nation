import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  Briefcase,
  Heart,
  TrendingUp,
  TrendingDown,
  Plus,
  Settings,
  Download,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  UserPlus,
  Building2,
  Target,
  Award
} from 'lucide-react';

interface AdminDashboardProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
}

export const AdminDashboard = ({ currentRole }: AdminDashboardProps) => {
  // Mock data - in real app this would come from APIs
  const stats = {
    totalAlumni: 12547,
    activeUsers: 8934,
    monthlyGrowth: 5.2,
    engagementRate: 67.8,
    totalDonations: 2400000,
    donationGrowth: 12.5,
    activeJobs: 89,
    totalEvents: 24,
    upcomingEvents: 8,
  };

  const recentActivities = [
    { type: 'alumni', action: 'New alumni registration', user: 'John Smith', time: '2 minutes ago', status: 'success' },
    { type: 'donation', action: 'Large donation received', user: 'Sarah Johnson', time: '15 minutes ago', status: 'success' },
    { type: 'job', action: 'New job posting', user: 'TechCorp', time: '1 hour ago', status: 'pending' },
    { type: 'event', action: 'Event registration full', user: 'Alumni Reunion 2024', time: '2 hours ago', status: 'warning' },
    { type: 'support', action: 'Support ticket created', user: 'Anonymous', time: '3 hours ago', status: 'error' },
  ];

  const topDonationCampaigns = [
    { name: 'Emergency Relief Fund', raised: 67500, target: 100000, donors: 234 },
    { name: 'Engineering Lab', raised: 287000, target: 500000, donors: 89 },
    { name: 'Scholarship Program', raised: 156000, target: 250000, donors: 145 },
  ];

  const jobMetrics = [
    { category: 'Technology', count: 32, growth: 8.5 },
    { category: 'Finance', count: 18, growth: -2.1 },
    { category: 'Healthcare', count: 15, growth: 12.3 },
    { category: 'Marketing', count: 12, growth: 5.7 },
    { category: 'Engineering', count: 12, growth: 3.2 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'alumni': return <Users className="h-4 w-4" />;
      case 'donation': return <Heart className="h-4 w-4" />;
      case 'job': return <Briefcase className="h-4 w-4" />;
      case 'event': return <Calendar className="h-4 w-4" />;
      default: return <Settings className="h-4 w-4" />;
    }
  };

  if (currentRole !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Access Denied</h2>
          <p className="text-muted-foreground">You need admin privileges to view this dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BarChart3 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Comprehensive overview of alumni platform</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="professional">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Alumni</p>
                <p className="text-3xl font-bold text-foreground">{stats.totalAlumni.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+{stats.monthlyGrowth}% this month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-3xl font-bold text-foreground">{stats.activeUsers.toLocaleString()}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Target className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">{stats.engagementRate}% engagement</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-success rounded-lg flex items-center justify-center">
                <UserPlus className="h-6 w-6 text-success-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Donations</p>
                <p className="text-3xl font-bold text-foreground">{formatCurrency(stats.totalDonations)}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-success" />
                  <span className="text-xs text-success">+{stats.donationGrowth}% this quarter</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-secondary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Jobs</p>
                <p className="text-3xl font-bold text-foreground">{stats.activeJobs}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Building2 className="h-3 w-3 text-warning" />
                  <span className="text-xs text-muted-foreground">{stats.totalEvents} total events</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Activities</span>
              <Button variant="outline" size="sm">View All</Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-2">
                    {getActivityTypeIcon(activity.type)}
                    {getStatusIcon(activity.status)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Donation Campaigns */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Top Donation Campaigns</span>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Campaign
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topDonationCampaigns.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                    <Badge variant="secondary">{campaign.donors} donors</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-success font-semibold">
                      {formatCurrency(campaign.raised)}
                    </span>
                    <span className="text-muted-foreground">
                      of {formatCurrency(campaign.target)}
                    </span>
                  </div>
                  <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {Math.round((campaign.raised / campaign.target) * 100)}% funded
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Market Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Job Market Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobMetrics.map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
                      <span className="text-xs font-bold text-primary-foreground">{job.count}</span>
                    </div>
                    <span className="font-medium text-foreground">{job.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {job.growth >= 0 ? (
                      <TrendingUp className="h-4 w-4 text-success" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    )}
                    <span className={`text-sm font-semibold ${
                      job.growth >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      {job.growth >= 0 ? '+' : ''}{job.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Alumni
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Create Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Briefcase className="h-4 w-4 mr-2" />
                Post Job
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Launch Campaign
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                System Settings
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};