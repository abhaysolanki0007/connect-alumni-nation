import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Calendar, 
  Briefcase, 
  Heart, 
  BarChart3, 
  UserPlus, 
  Settings,
  Menu,
  X,
  GraduationCap
} from 'lucide-react';

interface NavigationProps {
  currentRole: 'alumni' | 'student' | 'admin' | null;
  onRoleChange: (role: 'alumni' | 'student' | 'admin' | null) => void;
}

export const Navigation = ({ currentRole, onRoleChange }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = {
    alumni: [
      { icon: Users, label: 'Directory', key: 'directory' },
      { icon: Calendar, label: 'Events', key: 'events' },
      { icon: Briefcase, label: 'Jobs', key: 'jobs' },
      { icon: Heart, label: 'Donate', key: 'donate' },
      { icon: Settings, label: 'Profile', key: 'profile' },
    ],
    student: [
      { icon: Users, label: 'Alumni', key: 'directory' },
      { icon: UserPlus, label: 'Mentorship', key: 'mentorship' },
      { icon: Briefcase, label: 'Jobs', key: 'jobs' },
      { icon: Calendar, label: 'Events', key: 'events' },
    ],
    admin: [
      { icon: BarChart3, label: 'Dashboard', key: 'dashboard' },
      { icon: Users, label: 'Alumni', key: 'alumni-management' },
      { icon: Calendar, label: 'Events', key: 'event-management' },
      { icon: Briefcase, label: 'Jobs', key: 'job-management' },
      { icon: Heart, label: 'Donations', key: 'donation-management' },
    ],
  };

  const currentMenuItems = currentRole ? menuItems[currentRole] : [];

  return (
    <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">AlumniConnect</h1>
                <p className="text-xs text-muted-foreground">University Alumni Platform</p>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {currentMenuItems.map(({ icon: Icon, label, key }) => (
              <button
                key={key}
                className="flex items-center space-x-1 text-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Role Switcher (Demo Purpose) */}
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Role:</span>
              <div className="flex space-x-1">
                {(['alumni', 'student', 'admin'] as const).map((role) => (
                  <Button
                    key={role}
                    variant={currentRole === role ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onRoleChange(role)}
                    className="capitalize text-xs"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {/* Current Role Badge */}
            {currentRole && (
              <Badge variant="secondary" className="capitalize">
                {currentRole}
              </Badge>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="pt-2 pb-3 space-y-1">
              {currentMenuItems.map(({ icon: Icon, label, key }) => (
                <button
                  key={key}
                  className="flex items-center space-x-3 w-full px-3 py-2 text-left text-foreground hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>
            
            {/* Mobile Role Switcher */}
            <div className="pt-4 border-t border-border">
              <p className="px-3 text-sm font-medium text-muted-foreground mb-2">Switch Role:</p>
              <div className="px-3 flex space-x-2">
                {(['alumni', 'student', 'admin'] as const).map((role) => (
                  <Button
                    key={role}
                    variant={currentRole === role ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      onRoleChange(role);
                      setIsMenuOpen(false);
                    }}
                    className="capitalize"
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};