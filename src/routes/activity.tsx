import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { mockActivities } from '@/lib/seed-data';
import { Plane, MapPin, UserPlus, CheckCircle, Sparkles } from 'lucide-react';
import type { Activity } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';

export const Route = createFileRoute('/activity')({
  component: ActivityFeedComponent,
  beforeLoad: () => {
    document.title = 'Activity - Journeys';
  },
});

function ActivityFeedComponent() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'trip_created':
        return <Plane size={16} className="text-accent-cyan" />;
      case 'trip_completed':
        return <CheckCircle size={16} className="text-accent-teal" />;
      case 'place_saved':
        return <MapPin size={16} className="text-accent-cyan" />;
      case 'friend_added':
        return <UserPlus size={16} className="text-accent-teal" />;
      default:
        return <Sparkles size={16} className="text-accent-cyan" />;
    }
  };

  const getActivityText = (activity: Activity) => {
    switch (activity.type) {
      case 'trip_created':
        return (
          <>
            <span className="font-semibold text-text-primary">{activity.userName}</span>
            <span className="text-text-secondary"> created a trip to </span>
            <span className="font-semibold text-text-primary">{activity.data.tripName}</span>
          </>
        );
      case 'trip_completed':
        return (
          <>
            <span className="font-semibold text-text-primary">{activity.userName}</span>
            <span className="text-text-secondary"> completed </span>
            <span className="font-semibold text-text-primary">{activity.data.tripName}</span>
          </>
        );
      case 'place_saved':
        return (
          <>
            <span className="font-semibold text-text-primary">{activity.userName}</span>
            <span className="text-text-secondary"> saved </span>
            <span className="font-semibold text-text-primary">{activity.data.placeName}</span>
          </>
        );
      case 'friend_added':
        return (
          <>
            <span className="font-semibold text-text-primary">{activity.userName}</span>
            <span className="text-text-secondary"> became friends with </span>
            <span className="font-semibold text-text-primary">{activity.data.friendName}</span>
          </>
        );
      default:
        return <span className="text-text-secondary">Activity</span>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
          Activity
        </motion.h1>
        <p className="text-text-secondary">A quiet record of plans taking shape.</p>
      </header>

      {/* Activity Feed */}
      <div className="px-6 divide-y divide-border border-y border-border bg-surface">
        {mockActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="flex gap-3 py-4 hover:bg-surface-secondary/60 transition-colors"
          >
            {/* Avatar */}
            <Avatar
              src={activity.userAvatar}
              name={activity.userName}
              size="lg"
              fallback="cyan"
            />

            {/* Activity Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 bg-background rounded-lg">{getActivityIcon(activity.type)}</div>
                <p className="text-sm flex-1 min-w-0">{getActivityText(activity)}</p>
              </div>
              <span className="text-xs text-text-secondary">
                {formatTimestamp(activity.timestamp)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State (if no activities) */}
      {mockActivities.length === 0 && (
        <EmptyState
          icon={<Sparkles className="h-16 w-16" />}
          title="No activity yet"
          description="Follow friends to see their travel adventures here"
          className="px-6"
        />
      )}
    </div>
  );
}
