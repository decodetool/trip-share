import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { StatCard } from '@/components/ui/StatCard';
import { MapPin, Settings, Download } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/profile')({
  component: ProfileComponent,
  beforeLoad: () => {
    document.title = 'Profile - Journeys';
  },
});

const savedPlaces = [
  { id: '1', name: 'Senso-ji Temple', city: 'Tokyo', emoji: '🗿' },
  { id: '2', name: 'Pastéis de Belém', city: 'Lisbon', emoji: '🥐' },
  { id: '3', name: 'Frida Kahlo Museum', city: 'Mexico City', emoji: '🎨' },
  { id: '4', name: 'Blue Bottle Coffee', city: 'Tokyo', emoji: '☕' },
  { id: '5', name: 'Time Out Market', city: 'Lisbon', emoji: '🍽️' },
];

function ProfileComponent() {
  const [offlineProgress, setOfflineProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleOfflineDownload = () => {
    setIsDownloading(true);
    setOfflineProgress(0);

    const interval = setInterval(() => {
      setOfflineProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDownloading(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header with Avatar */}
      <header className="px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4"
        >
          <Avatar size="xl">👤</Avatar>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary">Alex Rivera</h1>
            <p className="text-text-secondary">alex.rivera@email.com</p>
          </div>
          <IconButton
            label="Settings"
            className="border border-white/5 bg-surface"
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="h-5 w-5 text-text-primary" />
          </IconButton>
        </motion.div>
      </header>

      {/* Stats */}
      <section className="px-6 mb-8">
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Trips" value="3" />
          <StatCard label="Places" value="24" />
          <StatCard label="Friends" value="12" />
        </div>
      </section>

      {/* Saved Places */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Saved Places
        </h2>
        <div className="space-y-2">
          {savedPlaces.map((place, index) => (
            <motion.div
              key={place.id}
              className="flex items-center gap-3 p-3 bg-surface rounded-xl border border-white/5 hover:border-white/10 transition-all"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ x: 4 }}
            >
              <span className="text-2xl">{place.emoji}</span>
              <div className="flex-1">
                <p className="text-text-primary font-medium text-sm">{place.name}</p>
                <p className="text-text-secondary text-xs">{place.city}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Offline Pack */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Offline Pack
        </h2>
        <motion.div
          className="bg-surface rounded-2xl p-6 border border-white/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-text-secondary text-sm mb-4">
            Download maps and itinerary data for offline access
          </p>

          {isDownloading ? (
            <div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-teal to-accent-cyan"
                  initial={{ width: '0%' }}
                  animate={{ width: `${offlineProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-text-secondary text-xs text-center">
                {offlineProgress === 100 ? 'Complete!' : `Downloading... ${offlineProgress}%`}
              </p>
            </div>
          ) : (
            <Button fullWidth onClick={handleOfflineDownload}>
              <Download className="h-5 w-5" />
              Download Offline Pack
            </Button>
          )}
        </motion.div>
      </section>
    </div>
  );
}
