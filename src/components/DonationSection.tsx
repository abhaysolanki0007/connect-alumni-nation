import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Heart, 
  Target,
  Users,
  Trophy,
  DollarSign,
  Calendar,
  Star,
  Gift,
  TrendingUp,
  BookOpen,
  Building2,
  Zap
} from 'lucide-react';

interface Campaign {
  id: string;
  title: string;
  description: string;
  category: 'scholarship' | 'infrastructure' | 'research' | 'emergency';
  targetAmount: number;
  currentAmount: number;
  donorsCount: number;
  daysLeft: number;
  featured: boolean;
  organizer: string;
  organizerAvatar?: string;
  image?: string;
  benefits: string[];
  recentDonors: { name: string; amount: number; date: Date }[];
}

const sampleCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Student Emergency Relief Fund',
    description: 'Supporting students facing financial hardships due to unexpected circumstances. Help us ensure no student has to leave their dreams behind.',
    category: 'emergency',
    targetAmount: 100000,
    currentAmount: 67500,
    donorsCount: 234,
    daysLeft: 45,
    featured: true,
    organizer: 'Alumni Affairs Office',
    benefits: ['Tax Deductible', 'Annual Report', 'Recognition'],
    recentDonors: [
      { name: 'Sarah Johnson', amount: 500, date: new Date('2024-04-20') },
      { name: 'Michael Chen', amount: 250, date: new Date('2024-04-19') },
      { name: 'Anonymous', amount: 1000, date: new Date('2024-04-18') },
    ],
  },
  {
    id: '2',
    title: 'New Engineering Lab Construction',
    description: 'Building state-of-the-art facilities to prepare students for the future of engineering and technology innovation.',
    category: 'infrastructure',
    targetAmount: 500000,
    currentAmount: 287000,
    donorsCount: 89,
    daysLeft: 120,
    featured: true,
    organizer: 'Engineering Department',
    benefits: ['Naming Rights Available', 'VIP Tour', 'Plaque Recognition'],
    recentDonors: [
      { name: 'TechCorp Alumni Group', amount: 10000, date: new Date('2024-04-21') },
      { name: 'Dr. Emily Rodriguez', amount: 5000, date: new Date('2024-04-20') },
    ],
  },
  {
    id: '3',
    title: 'Merit-Based Scholarship Program',
    description: 'Providing scholarships to exceptional students who demonstrate academic excellence and leadership potential.',
    category: 'scholarship',
    targetAmount: 250000,
    currentAmount: 156000,
    donorsCount: 145,
    daysLeft: 90,
    featured: false,
    organizer: 'Financial Aid Office',
    benefits: ['Scholarship Naming', 'Student Updates', 'Annual Gala Invite'],
    recentDonors: [
      { name: 'Class of 2015 Group', amount: 2500, date: new Date('2024-04-22') },
      { name: 'James Wilson', amount: 1000, date: new Date('2024-04-21') },
    ],
  },
  {
    id: '4',
    title: 'AI Research Initiative',
    description: 'Advancing artificial intelligence research and supporting graduate students in cutting-edge AI projects.',
    category: 'research',
    targetAmount: 150000,
    currentAmount: 45000,
    donorsCount: 67,
    daysLeft: 75,
    featured: false,
    organizer: 'Computer Science Department',
    benefits: ['Research Updates', 'Patent Attribution', 'Lab Visit'],
    recentDonors: [
      { name: 'AI Ventures Alumni', amount: 7500, date: new Date('2024-04-19') },
      { name: 'Tech Startup Founders', amount: 3000, date: new Date('2024-04-18') },
    ],
  },
];

const donationTiers = [
  { amount: 25, title: 'Supporter', benefits: ['Thank you email', 'Digital badge'] },
  { amount: 100, title: 'Contributor', benefits: ['Thank you email', 'Digital badge', 'Alumni newsletter'] },
  { amount: 500, title: 'Benefactor', benefits: ['All previous', 'Annual report', 'Recognition on website'] },
  { amount: 1000, title: 'Champion', benefits: ['All previous', 'Campus tour', 'VIP event access'] },
  { amount: 5000, title: 'Patron', benefits: ['All previous', 'Naming opportunity', 'Direct updates'] },
];

interface DonationSectionProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
}

export const DonationSection = ({ currentRole }: DonationSectionProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('');

  const quickAmounts = [25, 50, 100, 250, 500, 1000];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      scholarship: BookOpen,
      infrastructure: Building2,
      research: Target,
      emergency: Zap,
    };
    return icons[category as keyof typeof icons] || Heart;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      scholarship: 'bg-primary text-primary-foreground',
      infrastructure: 'bg-secondary text-secondary-foreground',
      research: 'bg-success text-success-foreground',
      emergency: 'bg-destructive text-destructive-foreground',
    };
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const totalRaised = sampleCampaigns.reduce((sum, campaign) => sum + campaign.currentAmount, 0);
  const totalDonors = sampleCampaigns.reduce((sum, campaign) => sum + campaign.donorsCount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
            <Heart className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">Give Back</h1>
            <p className="text-muted-foreground">Support the next generation of students</p>
          </div>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-8">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">{formatCurrency(totalRaised)}</div>
              <div className="text-sm text-muted-foreground">Total Raised This Year</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">{totalDonors}</div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-secondary mx-auto mb-2" />
              <div className="text-3xl font-bold text-foreground">450+</div>
              <div className="text-sm text-muted-foreground">Students Supported</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Featured Campaigns */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-6">
          <Star className="h-5 w-5 text-warning" />
          <h2 className="text-2xl font-bold text-foreground">Featured Campaigns</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sampleCampaigns.filter(campaign => campaign.featured).map((campaign) => {
            const CategoryIcon = getCategoryIcon(campaign.category);
            const progressPercentage = getProgressPercentage(campaign.currentAmount, campaign.targetAmount);
            
            return (
              <Card key={campaign.id} className="group hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(campaign.category)}>
                          <CategoryIcon className="h-3 w-3 mr-1" />
                          {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="border-warning text-warning">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Featured
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">
                        {campaign.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm mb-4">
                        {campaign.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-success">
                        {formatCurrency(campaign.currentAmount)}
                      </span>
                      <span className="text-muted-foreground">
                        of {formatCurrency(campaign.targetAmount)}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{Math.round(progressPercentage)}% funded</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.donorsCount} donors</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{campaign.daysLeft} days left</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Recent Donors */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Recent supporters:</p>
                      <div className="flex -space-x-2">
                        {campaign.recentDonors.slice(0, 3).map((donor, index) => (
                          <Avatar key={index} className="h-6 w-6 border-2 border-background">
                            <AvatarFallback className="text-xs bg-gradient-primary text-primary-foreground">
                              {donor.name === 'Anonymous' ? '?' : donor.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {campaign.donorsCount > 3 && (
                          <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">+{campaign.donorsCount - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <Button 
                        variant="premium" 
                        className="flex-1"
                        onClick={() => setSelectedCampaign(campaign.id)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Donate Now
                      </Button>
                      <Button variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Donation Form */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="h-5 w-5" />
            <span>Make a Quick Donation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side - Amount Selection */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Choose Your Impact</h3>
                <div className="grid grid-cols-3 gap-3">
                  {quickAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant={selectedAmount === amount ? "default" : "outline"}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className="h-12"
                    >
                      {formatCurrency(amount)}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Or enter custom amount:
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Select Campaign:
                </label>
                <select
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
                >
                  <option value="">General Fund</option>
                  {sampleCampaigns.map(campaign => (
                    <option key={campaign.id} value={campaign.id}>
                      {campaign.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Right Side - Donation Tiers */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Donation Benefits</h3>
              <div className="space-y-3">
                {donationTiers.map((tier) => (
                  <div
                    key={tier.amount}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      (selectedAmount === tier.amount || (customAmount && parseInt(customAmount) >= tier.amount))
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{tier.title}</h4>
                      <Badge variant="secondary">{formatCurrency(tier.amount)}+</Badge>
                    </div>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {tier.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-success rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="professional" size="lg" className="flex-1">
                <Heart className="h-5 w-5 mr-2" />
                Donate {formatCurrency(selectedAmount || parseInt(customAmount) || 0)}
              </Button>
              <Button variant="outline" size="lg">
                Save for Later
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Your donation is tax-deductible. You will receive a receipt via email.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* All Campaigns Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">All Campaigns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleCampaigns.filter(campaign => !campaign.featured).map((campaign) => {
            const CategoryIcon = getCategoryIcon(campaign.category);
            const progressPercentage = getProgressPercentage(campaign.currentAmount, campaign.targetAmount);
            
            return (
              <Card key={campaign.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className={getCategoryColor(campaign.category)}>
                      <CategoryIcon className="h-3 w-3 mr-1" />
                      {campaign.category.charAt(0).toUpperCase() + campaign.category.slice(1)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {campaign.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {campaign.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-success">
                        {formatCurrency(campaign.currentAmount)}
                      </span>
                      <span className="text-muted-foreground">
                        of {formatCurrency(campaign.targetAmount)}
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{campaign.donorsCount} donors</span>
                      <span>{campaign.daysLeft} days left</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="h-3 w-3 mr-1" />
                      Donate
                    </Button>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};