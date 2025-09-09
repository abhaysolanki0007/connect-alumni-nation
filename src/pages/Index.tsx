import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { AlumniDirectory } from '@/components/AlumniDirectory';
import { EventsSection } from '@/components/EventsSection';
import { JobPortal } from '@/components/JobPortal';
import { DonationSection } from '@/components/DonationSection';
import { AdminDashboard } from '@/components/AdminDashboard';

const Index = () => {
  const [currentRole, setCurrentRole] = useState<'alumni' | 'student' | 'admin' | null>('alumni');
  const [currentView, setCurrentView] = useState<'home' | 'directory' | 'events' | 'jobs' | 'donations' | 'dashboard'>('home');

  const handleGetStarted = () => {
    setCurrentView('directory');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'directory':
        return <AlumniDirectory currentRole={currentRole} />;
      case 'events':
        return <EventsSection currentRole={currentRole} />;
      case 'jobs':
        return <JobPortal currentRole={currentRole} />;
      case 'donations':
        return <DonationSection currentRole={currentRole} />;
      case 'dashboard':
        return <AdminDashboard currentRole={currentRole} />;
      default:
        return <Hero currentRole={currentRole} onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole}
      />
      
      {/* Navigation Buttons for Demo */}
      <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 overflow-x-auto">
            {[
              { key: 'home', label: 'Home' },
              { key: 'directory', label: 'Alumni Directory' },
              { key: 'events', label: 'Events' },
              { key: 'jobs', label: 'Jobs & Internships' },
              { key: 'donations', label: 'Donations' },
              ...(currentRole === 'admin' ? [{ key: 'dashboard', label: 'Admin Dashboard' }] : []),
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCurrentView(key as any)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  currentView === key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main>
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">AlumniConnect</h3>
              <p className="text-muted-foreground text-sm">
                Connecting alumni, students, and opportunities for a brighter future.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Alumni Directory</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Job Portal</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Mentorship</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 AlumniConnect University. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              Built with ❤️ for our amazing alumni community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;