import { ArrowLeft } from 'lucide-react';
import { MotionLink } from '@/components/ui/Link';
import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { currentUser } from '@/lib/seed-data';
import { useState } from 'react';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { iconButtonVariants } from '@/components/ui/IconButton';

export const Route = createFileRoute('/settings/profile')({
  component: ProfileSettingsComponent,
  beforeLoad: () => {
    document.title = 'Profile Settings - Journeys';
  },
});

function ProfileSettingsComponent() {
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email || '');

  const handleSave = () => {
    alert('Profile saved! (This is a demo)');
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <MotionLink to="/settings" aria-label="Go back" className={iconButtonVariants()}><ArrowLeft size={20} /></MotionLink>
          <motion.h1
            className="text-2xl font-bold text-text-primary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Profile Settings
          </motion.h1>
        </div>
      </header>

      {/* Content */}
      <div className="px-6 py-8 space-y-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            <Avatar
              src={currentUser.avatar}
              name={currentUser.name}
              size="2xl"
              fallback="gradient"
            />
            <motion.button
              className="absolute bottom-0 right-0 p-2 bg-accent-cyan rounded-full text-background shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Camera size={16} />
            </motion.button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-surface rounded-2xl border border-white/5 text-text-primary focus:border-accent-cyan focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface rounded-2xl border border-white/5 text-text-primary focus:border-accent-cyan focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-secondary mb-2">Bio</label>
            <textarea
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full px-4 py-3 bg-surface rounded-2xl border border-white/5 text-text-primary placeholder-text-secondary focus:border-accent-cyan focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Save Button */}
        <Button fullWidth onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
