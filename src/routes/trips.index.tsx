import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { mockApi } from '@/lib/mock-api';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { Button, Fab } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { Tabs } from '@/components/ui/Tabs';
import { MapPin, Users, Plus, Plane, ArrowRight } from 'lucide-react';
import type { Trip } from '@/types';

export const Route = createFileRoute('/trips/')({
  component: TripsListComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      filter: (search.filter as 'all' | 'upcoming' | 'past' | 'shared') || 'all',
    };
  },
  beforeLoad: () => {
    document.title = 'My Trips - Journeys';
  },
});

function TripsListComponent() {
  const navigate = useNavigate();
  const searchParams = useSearch({ from: '/trips/' });
  const activeFilter = searchParams.filter || 'all';

  const { data: allTrips, isLoading } = useQuery({
    queryKey: ['trips'],
    queryFn: () => mockApi.getTrips(),
  });

  // Filter and sort trips by date
  const filteredTrips = allTrips
    ?.filter((trip) => {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'upcoming') return trip.status === 'upcoming' || trip.status === 'planning';
      if (activeFilter === 'past') return trip.status === 'completed';
      if (activeFilter === 'shared') return trip.travelers.length > 1;
      return true;
    })
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  // Group trips by month/year
  const groupedTrips = filteredTrips?.reduce((groups, trip) => {
    const date = new Date(trip.startDate);
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(trip);
    return groups;
  }, {} as Record<string, Trip[]>);

  const tabs = [
    { id: 'all', label: 'All Trips', count: allTrips?.length || 0 },
    {
      id: 'upcoming',
      label: 'Upcoming',
      count: allTrips?.filter((t) => t.status === 'upcoming' || t.status === 'planning').length || 0,
    },
    {
      id: 'past',
      label: 'Past',
      count: allTrips?.filter((t) => t.status === 'completed').length || 0,
    },
    {
      id: 'shared',
      label: 'Shared',
      count: allTrips?.filter((t) => t.travelers.length > 1).length || 0,
    },
  ];

  const handleTabChange = (tabId: string) => {
    navigate({
      to: '/trips',
      search: { filter: tabId as 'all' | 'upcoming' | 'past' | 'shared' },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <header className="px-6 pt-12 pb-6">
          <h1 className="font-serif text-[2.5rem] font-medium leading-none text-text-primary mb-2">My Trips</h1>
          <p className="text-text-secondary">Loading your adventures...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Create Trip Button - Bottom right for thumb reach */}
      <Fab onClick={() => alert('Create trip wizard coming soon!')}>
        <Plus size={24} />
      </Fab>

      {/* Header */}
      <header className="px-6 pt-12 pb-4">
        <motion.h1
          className="font-serif text-[2.5rem] font-medium leading-none text-text-primary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          My Trips
        </motion.h1>
        <p className="text-text-secondary mb-4">The plans, people, and places ahead.</p>

        {/* Filter Tabs */}
        <Tabs tabs={tabs} activeTab={activeFilter} onChange={handleTabChange} className="mt-6" />
      </header>

      {/* Timeline View */}
      <div className="pb-24 pt-6">
        {groupedTrips && Object.keys(groupedTrips).length > 0 ? (
          <div className="space-y-8">
            <AnimatePresence mode="popLayout">
              {Object.entries(groupedTrips).map(([monthYear, trips], groupIndex) => (
                <motion.div
                  key={monthYear}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: groupIndex * 0.1 }}
                >
                  {/* Month Header */}
                  <div className="px-6 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-border" />
                      <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-[0.16em]">
                        {monthYear}
                      </h2>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                  </div>

                  {/* Trips in this month */}
                  <div className="space-y-3 px-6">
                    {trips.map((trip, tripIndex) => (
                      <TripTimelineCard
                        key={trip.id}
                        trip={trip}
                        index={tripIndex}
                        onClick={() => navigate({ to: `/trips/${trip.id}` })}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <EmptyState
            icon={<Plane className="h-20 w-20" />}
            title={activeFilter === 'all' ? 'No trips yet' : `No ${activeFilter} trips`}
            description={
              activeFilter === 'all'
                ? 'Start planning your next adventure!'
                : 'Adjust your filter or create a new trip'
            }
            action={
              <Button
                className="text-surface shadow-glow-teal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => alert('Create trip wizard coming soon!')}
              >
                Create Your First Trip
              </Button>
            }
          />
        )}
      </div>
    </div>
  );
}

function TripTimelineCard({
  trip,
  index,
  onClick,
}: {
  trip: Trip;
  index: number;
  onClick: () => void;
}) {
  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return `${days}d`;
  };

  const getStatusColor = () => {
    switch (trip.status) {
      case 'completed':
        return 'bg-surface-secondary border-border';
      case 'upcoming':
        return 'bg-accent-cyan/10 border-accent-cyan/30';
      case 'planning':
        return 'bg-accent-teal/10 border-accent-teal/30';
      default:
        return 'bg-surface border-border';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className={`relative flex gap-3 p-4 rounded-2xl border transition-colors ${getStatusColor()} hover:border-text-secondary/40`}>
        {/* Date Badge */}
        <div className="flex-shrink-0 w-16 flex flex-col items-center justify-center bg-accent-teal rounded-xl p-2 text-surface">
          <div className="text-2xl font-bold leading-none">{new Date(trip.startDate).getDate()}</div>
          <div className="text-[10px] uppercase font-semibold mt-0.5">
            {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short' })}
          </div>
        </div>

        {/* Trip Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-semibold text-text-primary truncate">{trip.name}</h3>
            <span className="text-xs text-text-secondary whitespace-nowrap">{getDuration()}</span>
          </div>

          <div className="flex items-center gap-1.5 text-text-secondary text-sm mb-2">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="truncate">{trip.destination}</span>
          </div>

          <div className="flex items-center justify-between">
            {/* Travelers */}
            {trip.travelers && trip.travelers.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-text-secondary" />
                <AvatarGroup size="xs" max={3} total={trip.travelers.length}>
                  {trip.travelers.map((traveler) => (
                    <Avatar
                      key={traveler.id ?? traveler.name}
                      src={traveler.avatar}
                      name={traveler.name}
                      size="xs"
                      fallback="cyan"
                      bordered
                    />
                  ))}
                </AvatarGroup>
              </div>
            )}

            {/* Arrow */}
            <ArrowRight size={16} className="text-text-secondary group-hover:text-accent-cyan group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
