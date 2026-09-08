import { MotionLink } from '@/components/ui/Link';
import { createFileRoute, useLocation, useNavigate, useSearch } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { mockApi } from '@/lib/mock-api';
import type { City } from '@/types';
import { MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { buttonVariants } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { SearchInput } from '@/components/ui/SearchInput';
import { CityCardSkeleton } from '@/components/LoadingSkeleton';
import { CityDetailSheet } from '@/components/CityDetailSheet';
import { PlaceDetailSheet } from '@/components/PlaceDetailSheet';

export const Route = createFileRoute('/discover')({
  component: DiscoverComponent,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      city: (search.city as string) || undefined,
      place: (search.place as string) || undefined,
    };
  },
  beforeLoad: () => {
    document.title = 'Discover - Journeys';
  },
});

export function DiscoverComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = useSearch({ strict: false }) as { city?: string; place?: string };
  const discoverPath = location.pathname === '/discover' ? '/discover' : '/';

  const { data: cities, isLoading } = useQuery({
    queryKey: ['cities'],
    queryFn: () => mockApi.getCities(),
  });

  const { data: allPlaces } = useQuery({
    queryKey: ['places'],
    queryFn: () => mockApi.getPlaces(),
  });

  const seasons = ['Winter Escapes', 'Spring Blooms', 'Summer Vibes', 'Fall Colors'];
  const [selectedSeason, setSelectedSeason] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Get selected city and place from URL params
  const selectedCity = cities?.find(c => c.id === searchParams.city);
  const selectedPlace = allPlaces?.find(p => p.id === searchParams.place);

  const filteredCities = cities?.filter(city =>
    searchQuery === '' ||
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <header className="px-6 pt-12 pb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-cyan mb-2">Journeys</p>
          <h1 className="font-serif text-[2.5rem] font-medium leading-none text-text-primary mb-2">Discover</h1>
          <p className="text-text-secondary">Find a place worth planning around.</p>
        </header>
        <div className="px-6 pb-24 space-y-6">
          {[1, 2, 3].map(i => (
            <CityCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-6 pt-12 pb-4">
        <motion.h1
          className="font-serif text-[2.5rem] font-medium leading-none text-text-primary mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Discover
        </motion.h1>
        <p className="text-text-secondary mb-5">Find a place worth planning around.</p>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            clearable
            placeholder="Search cities, countries, or tags..."
          />
        </motion.div>
      </header>

      {/* Seasonal Filter Chips */}
      <div className="pb-6 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 px-6">
          {seasons.map((season, index) => (
            <motion.button
              key={season}
              onClick={() => setSelectedSeason(index)}
              className={`px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-all ${
                selectedSeason === index
                  ? 'bg-accent-cyan text-surface'
                  : 'bg-surface text-text-secondary border border-border hover:border-text-secondary/40'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {season}
            </motion.button>
          ))}
        </div>
      </div>

      {/* City Cards */}
      <div className="px-6 pb-24">
        <AnimatePresence mode="popLayout">
          {filteredCities && filteredCities.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {filteredCities.map((city, index) => (
                <CityCard key={city.id} city={city} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState
              key="no-results"
              icon={<MapPin className="h-16 w-16" />}
              title="No cities found"
              description="Try adjusting your search query"
              className="py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* City Detail Sheet */}
      {selectedCity && (
        <CityDetailSheet
          city={selectedCity}
          places={allPlaces || []}
          isOpen={!!searchParams.city}
          onClose={() => navigate({ to: discoverPath, search: { city: undefined, place: undefined } })}
          onPlaceClick={(placeId) => navigate({ to: discoverPath, search: { city: searchParams.city, place: placeId } })}
        />
      )}

      {/* Place Detail Sheet */}
      {selectedPlace && (
        <PlaceDetailSheet
          place={selectedPlace}
          isOpen={!!searchParams.place}
          onClose={() => navigate({ to: discoverPath, search: { city: searchParams.city, place: undefined } })}
          categoryColor="#4ECDC4"
          categoryEmoji="📍"
        />
      )}
    </div>
  );
}

function CityCard({ city, index }: { city: City; index: number }) {
  const location = useLocation();
  const discoverPath = location.pathname === '/discover' ? '/discover' : '/';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl bg-surface border border-border hover:border-text-secondary/30 transition-colors">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          {city.imageUrl ? (
            <>
              <img
                src={city.imageUrl}
                alt={city.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-surface-secondary items-center justify-center">
                <MapPin size={48} className="text-text-secondary opacity-30" />
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-surface-secondary flex items-center justify-center">
              <MapPin size={48} className="text-text-secondary opacity-30" />
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-black/35 z-10" />

          {/* City name overlay */}
          <div className="absolute bottom-4 left-4 z-20">
            <h3 className="font-serif text-3xl font-medium text-white mb-1">{city.name}</h3>
            <p className="text-sm text-white/80">{city.country}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {city.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {city.tags.map((tag) => (
              <Badge key={tag} variant="surface">
                {tag}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <MotionLink
            className={buttonVariants({ fullWidth: true, className: 'mt-4 text-surface shadow-glow-teal' })}
            to={discoverPath} search={{ city: city.id, place: undefined }}
          >
            Plan Trip
          </MotionLink>
        </div>
      </div>
    </motion.div>
  );
}
