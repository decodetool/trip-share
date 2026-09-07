import { createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Users, UserPlus, Clock } from 'lucide-react';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { IconButton } from '@/components/ui/IconButton';

export const Route = createFileRoute('/friends')({
  component: FriendsComponent,
  beforeLoad: () => {
    document.title = 'Friends - Journeys';
  },
});

const mockSharedTrips = [
  {
    id: '1',
    tripName: 'Tokyo Adventure',
    role: 'owner' as const,
    sharedWith: [
      { id: '1', name: 'Sarah Chen', avatar: '👩🏻‍💻' },
      { id: '2', name: 'Mike Johnson', avatar: '👨🏽‍🎨' },
    ],
    city: 'Tokyo',
    dates: 'Dec 15-22',
  },
  {
    id: '2',
    tripName: 'Lisbon Getaway',
    role: 'editor' as const,
    sharedWith: [
      { id: '3', name: 'Emma Wilson', avatar: '👩🏼' },
    ],
    city: 'Lisbon',
    dates: 'Jan 10-15',
  },
  {
    id: '3',
    tripName: 'Paris Weekend',
    role: 'viewer' as const,
    sharedWith: [
      { id: '4', name: 'Alex Kim', avatar: '👨🏻' },
      { id: '5', name: 'Lisa Park', avatar: '👩🏻' },
      { id: '6', name: 'Tom Brown', avatar: '👨🏼‍🦱' },
    ],
    city: 'Paris',
    dates: 'Feb 3-5',
  },
];

const mockActivity = [
  {
    id: '1',
    userName: 'Sarah Chen',
    userAvatar: '👩🏻‍💻',
    action: 'added "Senso-ji Temple" to Day 2',
    tripName: 'Tokyo Adventure',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    userName: 'Emma Wilson',
    userAvatar: '👩🏼',
    action: 'moved "Pastéis de Belém" to 9:00 AM',
    tripName: 'Lisbon Getaway',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    userName: 'Mike Johnson',
    userAvatar: '👨🏽‍🎨',
    action: 'commented on "TeamLab Borderless"',
    tripName: 'Tokyo Adventure',
    timestamp: 'Yesterday',
  },
];

function FriendsComponent() {
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="px-6 pt-12 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Friends</h1>
            <p className="text-text-secondary">Shared trips and activity</p>
          </div>
          <IconButton label="Add friend" variant="primary">
            <UserPlus className="h-5 w-5 text-background" />
          </IconButton>
        </motion.div>
      </header>

      {/* Shared Trips */}
      <section className="px-6 mb-8">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Shared Trips
        </h2>
        <div className="space-y-3">
          {mockSharedTrips.map((trip, index) => (
            <SharedTripCard key={trip.id} trip={trip} index={index} />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="px-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </h2>
        <div className="space-y-3">
          {mockActivity.map((activity, index) => (
            <ActivityCard key={activity.id} activity={activity} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

function SharedTripCard({ trip, index }: { trip: typeof mockSharedTrips[0]; index: number }) {
  const roleVariants = {
    owner: 'cyan',
    editor: 'teal',
    viewer: 'muted',
  } as const;

  return (
    <motion.div
      className="bg-surface rounded-2xl p-4 border border-white/5 hover:border-white/10 transition-all"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-text-primary font-semibold mb-1">{trip.tripName}</h3>
          <p className="text-text-secondary text-sm">
            {trip.city} • {trip.dates}
          </p>
        </div>
        <Badge
          variant={roleVariants[trip.role]}
          className={trip.role === 'viewer' ? 'bg-white/10' : undefined}
        >
          {trip.role}
        </Badge>
      </div>

      {/* Avatars */}
      <div className="flex items-center gap-2">
        <AvatarGroup size="sm">
          {trip.sharedWith.map((user) => (
            <Avatar
              key={user.id}
              size="sm"
              bordered
              className="border-surface bg-surface-secondary text-lg"
            >
              {user.avatar}
            </Avatar>
          ))}
        </AvatarGroup>
        <span className="text-text-secondary text-xs">
          {trip.sharedWith.length} {trip.sharedWith.length === 1 ? 'person' : 'people'}
        </span>
      </div>
    </motion.div>
  );
}

function ActivityCard({ activity, index }: { activity: typeof mockActivity[0]; index: number }) {
  return (
    <motion.div
      className="flex items-start gap-3 p-3 bg-surface rounded-xl border border-white/5"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <div className="w-10 h-10 rounded-full bg-surface-secondary flex items-center justify-center text-xl flex-shrink-0">
        {activity.userAvatar}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-sm">
          <span className="font-semibold">{activity.userName}</span>{' '}
          <span className="text-text-secondary">{activity.action}</span>
        </p>
        <p className="text-text-secondary text-xs mt-1">
          {activity.tripName} • {activity.timestamp}
        </p>
      </div>
    </motion.div>
  );
}
