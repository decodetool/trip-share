import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  User,
  Bell,
  Lock,
  Globe,
  HelpCircle,
  Info,
  ChevronRight,
  LogOut,
  Monitor,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme, type Theme, type ThemePreference } from '@/lib/theme';

export const Route = createFileRoute('/settings/')({
  component: SettingsComponent,
  beforeLoad: () => {
    document.title = 'Settings - Journeys';
  },
});

interface SettingItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  description: string;
  to?: string;
  action?: () => void;
  danger?: boolean;
}

function SettingsComponent() {
  const navigate = useNavigate();
  const { theme, preference, setPreference } = useTheme();

  const settingsSections: { title: string; items: SettingItem[] }[] = [
    {
      title: 'Account',
      items: [
        {
          id: 'profile',
          icon: <User size={20} />,
          label: 'Profile',
          description: 'Edit your personal information',
          to: '/settings/profile',
        },
        {
          id: 'notifications',
          icon: <Bell size={20} />,
          label: 'Notifications',
          description: 'Manage notification preferences',
          to: '/settings/notifications',
        },
        {
          id: 'privacy',
          icon: <Lock size={20} />,
          label: 'Privacy',
          description: 'Control your privacy settings',
          to: '/settings/privacy',
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          id: 'language',
          icon: <Globe size={20} />,
          label: 'Language & Region',
          description: 'English (US)',
          to: '/settings/language',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          id: 'help',
          icon: <HelpCircle size={20} />,
          label: 'Help Center',
          description: 'Get help and support',
          to: '/settings/help',
        },
        {
          id: 'about',
          icon: <Info size={20} />,
          label: 'About',
          description: 'App version and legal info',
          to: '/settings/about',
        },
      ],
    },
    {
      title: '',
      items: [
        {
          id: 'logout',
          icon: <LogOut size={20} />,
          label: 'Log Out',
          description: 'Sign out of your account',
          action: () => alert('Logout functionality coming soon!'),
          danger: true,
        },
      ],
    },
  ];

  const handleItemClick = (item: SettingItem) => {
    if (item.action) {
      item.action();
    } else if (item.to) {
      navigate({ to: item.to });
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <motion.h1
          className="font-serif text-[2.5rem] font-medium leading-none text-text-primary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Settings
        </motion.h1>
        <p className="text-text-secondary">Set the pace and privacy of your travels.</p>
      </header>

      {/* Settings Sections */}
      <div className="space-y-8">
        {settingsSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <h2 className="px-6 text-xs font-semibold text-text-secondary uppercase tracking-[0.16em] mb-3">
                {section.title}
              </h2>
            )}
            <div className="bg-surface mx-6 rounded-2xl border border-border overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
                  className={`w-full flex items-center gap-4 p-4 hover:bg-surface-secondary/60 transition-colors focus-ring ${
                    itemIndex < section.items.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 ${
                      item.danger ? 'text-red-400' : 'text-accent-cyan'
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p
                      className={`font-medium ${
                        item.danger ? 'text-red-400' : 'text-text-primary'
                      }`}
                    >
                      {item.label}
                    </p>
                    <p className="text-sm text-text-secondary truncate">{item.description}</p>
                  </div>
                  <ChevronRight
                    size={20}
                    className={item.danger ? 'text-red-400/50' : 'text-text-secondary'}
                  />
                </motion.button>
              ))}
            </div>
            {section.title === 'Preferences' && (
              <AppearanceSettings
                preference={preference}
                resolvedTheme={theme}
                onPreferenceChange={setPreference}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AppearanceSettings({
  preference,
  resolvedTheme,
  onPreferenceChange,
}: {
  preference: ThemePreference;
  resolvedTheme: Theme;
  onPreferenceChange: (preference: ThemePreference) => void;
}) {
  const options: { value: ThemePreference; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <Sun size={18} /> },
    { value: 'system', label: 'System', icon: <Monitor size={18} /> },
    { value: 'dark', label: 'Dark', icon: <Moon size={18} /> },
  ];

  return (
    <section className="mt-8">
      <div className="px-6 mb-3">
        <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-[0.16em]">Appearance</h2>
        <p className="mt-1 text-sm text-text-secondary">
          {preference === 'system'
            ? `Following your device, currently ${resolvedTheme} mode.`
            : `${preference === 'dark' ? 'Dark' : 'Light'} mode is pinned for Journeys.`}
        </p>
      </div>
      <div className="mx-6 grid grid-cols-3 gap-2 rounded-2xl border border-border bg-surface p-2" role="group" aria-label="Theme preference">
        {options.map((option) => {
          const isActive = preference === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onPreferenceChange(option.value)}
              aria-pressed={isActive}
              className={`flex min-h-20 flex-col items-start justify-between rounded-xl border px-3 py-3 text-left text-sm font-medium transition-colors duration-200 focus-ring ${
                isActive
                  ? 'border-border bg-surface-secondary text-text-primary shadow-sm'
                  : 'border-transparent text-text-secondary hover:bg-surface-secondary/65 hover:text-text-primary'
              }`}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
