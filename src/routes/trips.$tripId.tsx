import { ArrowLeft } from 'lucide-react';
import { MotionLink } from '@/components/ui/Link';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { mockApi } from '@/lib/mock-api';
import { Tabs } from '@/components/ui/Tabs';
import { Avatar, AvatarGroup } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { iconButtonVariants, IconButton } from '@/components/ui/IconButton';
import type { ItineraryItem, Place, Trip } from '@/types';
import {
  MapPin,
  Calendar,
  Users,
  DollarSign,
  ArrowRight,
  Edit,
  Share2,
  Package,
} from 'lucide-react';

export const Route = createFileRoute('/trips/$tripId')({
  component: TripDetailComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tab: (search.tab as 'overview' | 'budget' | 'packing' | 'sharing') || 'overview',
    };
  },
  beforeLoad: () => {
    document.title = `Trip Details - Journeys`;
  },
});

function TripDetailComponent() {
  const { tripId } = Route.useParams();
  const searchParams = useSearch({ from: '/trips/$tripId' });
  const activeTab = searchParams.tab || 'overview';

  const { data: trip, isLoading } = useQuery({
    queryKey: ['trip', tripId],
    queryFn: () => mockApi.getTrip(tripId),
  });

  const { data: itinerary } = useQuery({
    queryKey: ['itinerary', tripId],
    queryFn: () => mockApi.getItinerary(tripId),
    enabled: !!trip,
  });

  const { data: places } = useQuery({
    queryKey: ['places'],
    queryFn: () => mockApi.getPlaces(),
  });

  if (isLoading || !trip) {
    return (
      <div className="min-h-screen">
        <div className="px-6 pt-12">
          <p className="text-text-secondary">Loading trip...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'budget', label: 'Budget' },
    { id: 'packing', label: 'Packing' },
    { id: 'sharing', label: 'Sharing' },
  ];

  const linkForTab = (tabId: string) => ({
      to: '/trips/$tripId' as const,
      params: { tripId },
      search: { tab: tabId as 'overview' | 'budget' | 'packing' | 'sharing' },
    });

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section with Cover Image */}
      <div className="relative h-64 overflow-hidden">
        {trip.coverImage ? (
          <img
            src={trip.coverImage}
            alt={trip.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent-teal/20 to-accent-cyan/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <MotionLink to="/trips" search={{ filter: 'all' }} aria-label="Go back" className={iconButtonVariants({ variant: 'overlay', className: 'absolute top-6 left-6' })}><ArrowLeft size={20} /></MotionLink>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <IconButton label="Share trip" variant="overlay">
            <Share2 size={20} />
          </IconButton>
          <IconButton
            label="Edit trip"
            variant="overlay"
            onClick={() => alert('Edit trip coming soon!')}
          >
            <Edit size={20} />
          </IconButton>
        </div>

        {/* Trip Info Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">{trip.name}</h1>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin size={16} />
              <span>{trip.destination}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 border-b border-white/5">
        <Tabs tabs={tabs} activeTab={activeTab} linkForTab={linkForTab} />
      </div>

      {/* Tab Content */}
      <div className="px-6 py-6">
        {activeTab === 'overview' && (
          <OverviewTab trip={trip} itinerary={itinerary} places={places} />
        )}
        {activeTab === 'budget' && <BudgetTab trip={trip} />}
        {activeTab === 'packing' && <PackingTab />}
        {activeTab === 'sharing' && <SharingTab trip={trip} />}
      </div>
    </div>
  );
}

function OverviewTab({
  trip,
  itinerary,
  places,
}: {
  trip: Trip;
  itinerary?: ItineraryItem[];
  places?: Place[];
}) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <div className="space-y-6">
      {/* Trip Details */}
      <div className="bg-surface rounded-3xl p-6 border border-white/5">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Trip Details</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-accent-cyan mt-0.5" />
            <div>
              <p className="text-text-secondary text-sm">Dates</p>
              <p className="text-text-primary font-medium">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </p>
              <p className="text-text-secondary text-sm">{getDuration()}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-accent-teal mt-0.5" />
            <div>
              <p className="text-text-secondary text-sm">Travelers</p>
              <div className="flex items-center gap-2 mt-1">
                <AvatarGroup size="sm">
                  {trip.travelers.map((traveler) => (
                    <Avatar
                      key={traveler.id}
                      src={traveler.avatar}
                      name={traveler.name}
                      size="sm"
                      fallback="gradient"
                      bordered
                      className="border-surface"
                    />
                  ))}
                </AvatarGroup>
                <span className="text-text-primary font-medium">
                  {trip.travelers.map((traveler) => traveler.name).join(', ')}
                </span>
              </div>
            </div>
          </div>

          {trip.budget && (
            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-accent-cyan mt-0.5" />
              <div>
                <p className="text-text-secondary text-sm">Total Budget</p>
                <p className="text-text-primary font-medium text-lg">
                  ${trip.budget.toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Compact Itinerary Preview - Click to view full */}
      {itinerary && itinerary.length > 0 && (
        <MotionLink
          to="/itinerary"
          className="block focus-ring bg-gradient-to-br from-accent-teal/10 to-accent-cyan/10 rounded-3xl p-6 border border-accent-cyan/20 cursor-pointer hover:border-accent-cyan/40 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-text-primary">Day-by-Day Itinerary</h2>
            <ArrowRight size={20} className="text-accent-cyan" />
          </div>

          {/* Compact timeline visualization */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {itinerary.slice(0, 8).map((item, idx) => {
              const place = places?.find((candidate) => candidate.id === item.placeId);
              return (
                <div key={item.id} className="flex items-center gap-2 shrink-0">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/10 border border-white/20 flex-shrink-0">
                    {place?.imageUrl ? (
                      <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-accent-teal/30 to-accent-cyan/30" />
                    )}
                  </div>
                  {idx < Math.min(7, itinerary.length - 1) && (
                    <div className="w-2 h-0.5 bg-accent-cyan/40" />
                  )}
                </div>
              );
            })}
            {itinerary.length > 8 && (
              <div className="flex items-center gap-1 text-accent-cyan text-sm font-medium ml-2">
                +{itinerary.length - 8}
              </div>
            )}
          </div>

          <p className="text-text-secondary text-sm mt-3">
            {itinerary.length} activities planned • Tap to view full schedule
          </p>
        </MotionLink>
      )}
    </div>
  );
}

function BudgetTab({ trip }: { trip: Trip }) {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-3xl p-6 border border-white/5">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Budget Breakdown</h2>
        {trip.budget ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-text-secondary">Total Budget</span>
              <span className="text-2xl font-bold text-text-primary">${trip.budget.toLocaleString()}</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Accommodation</span>
                <span className="text-text-primary font-medium">${Math.floor(trip.budget * 0.4).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Food & Dining</span>
                <span className="text-text-primary font-medium">${Math.floor(trip.budget * 0.3).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Activities</span>
                <span className="text-text-primary font-medium">${Math.floor(trip.budget * 0.2).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Transportation</span>
                <span className="text-text-primary font-medium">${Math.floor(trip.budget * 0.1).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-text-secondary text-center py-8">No budget set for this trip</p>
        )}
      </div>
    </div>
  );
}

function PackingTab() {
  const mockPackingItems = [
    { id: 1, name: 'Passport', packed: true },
    { id: 2, name: 'Travel adapter', packed: true },
    { id: 3, name: 'Sunscreen', packed: false },
    { id: 4, name: 'Camera', packed: false },
    { id: 5, name: 'Comfortable shoes', packed: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-3xl p-6 border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Packing List</h2>
          <Package className="w-5 h-5 text-accent-cyan" />
        </div>
        <div className="space-y-2">
          {mockPackingItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl"
            >
              <input
                type="checkbox"
                checked={item.packed}
                readOnly
                className={`w-5 h-5 rounded border-white/20 ${
                  item.packed ? 'bg-gradient-to-r from-accent-teal to-accent-cyan' : 'bg-white/10'
                }`}
              />
              <span
                className={`flex-1 ${
                  item.packed ? 'text-text-secondary line-through' : 'text-text-primary'
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-text-secondary text-sm text-center mt-4">
          {mockPackingItems.filter((i) => i.packed).length} of {mockPackingItems.length} items packed
        </p>
      </div>
    </div>
  );
}

function SharingTab({ trip }: { trip: Trip }) {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-3xl p-6 border border-white/5">
        <h2 className="text-xl font-semibold text-text-primary mb-4">Shared With</h2>
        <div className="space-y-3">
          {trip.travelers.map((traveler) => (
            <div key={traveler.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-accent-teal to-accent-cyan flex-shrink-0">
                {traveler.avatar ? (
                  <img src={traveler.avatar} alt={traveler.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-semibold">
                    {traveler.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="text-text-primary font-medium">{traveler.name}</p>
                <p className="text-text-secondary text-sm">{traveler.email}</p>
              </div>
              <span className="text-accent-cyan text-sm font-medium">Editor</span>
            </div>
          ))}
        </div>
        <Button fullWidth variant="secondary" className="mt-4">
          Invite Friends
        </Button>
      </div>
    </div>
  );
}
