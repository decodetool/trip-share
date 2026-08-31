import { Link, useLocation } from '@tanstack/react-router';
import { MapPin, Users, Sparkles, Plane, MessageCircle, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/discover', icon: <Sparkles size={22} />, label: 'Discover' },
  { to: '/trips', icon: <Plane size={22} />, label: 'Trips' },
  { to: '/map', icon: <MapPin size={22} />, label: 'Map' },
  { to: '/activity', icon: <Users size={22} />, label: 'Activity' },
  { to: '/messages', icon: <MessageCircle size={22} />, label: 'Messages' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isSettingsActive = location.pathname.startsWith('/settings');

  return (
    <div className="h-screen flex flex-col bg-background text-text-primary">
      {/* Settings remains available without competing with the page title. */}
      <Link
        to="/settings"
        className={cn(
          'fixed top-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full bg-surface border border-border shadow-sm transition-colors duration-200 focus-ring',
          isSettingsActive
            ? 'text-accent-cyan border-accent-cyan/40'
            : 'text-text-secondary hover:text-text-primary hover:border-text-secondary/30'
        )}
      >
        <Settings size={20} />
      </Link>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto custom-scrollbar pb-20">
        {children}
      </main>

      {/* Bottom tab navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/95 border-t border-border z-50">
        <div className="max-w-2xl mx-auto px-3 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'flex flex-col items-center gap-1 py-2 px-2 rounded-xl transition-colors duration-200 relative focus-ring',
                    isActive
                      ? 'text-accent-cyan'
                      : 'text-text-secondary hover:text-text-primary hover:bg-text-primary/5'
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-1 bg-accent-cyan/10 rounded-xl"
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                    />
                  )}
                  <span className="relative z-10">{item.icon}</span>
                  <span className="relative z-10 text-[11px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
