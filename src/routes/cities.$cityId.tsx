import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { mockApi } from '@/lib/mock-api';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/IconButton';
import { StatCard } from '@/components/ui/StatCard';
import { Plus, Star } from 'lucide-react';
import { useState } from 'react';
import { PlaceDetailSheet } from '@/components/PlaceDetailSheet';
import type { Category } from '@/types';

export const Route = createFileRoute('/cities/$cityId')({
  component: CityDetailComponent,
  beforeLoad: () => {
    document.title = `City - Journeys`;
  },
});

const categoryColors: Record<Category, string> = {
  food: '#FF6B6B',
  museum: '#4ECDC4',
  cafe: '#FFE66D',
  landmark: '#95E1D3',
  transit: '#A8E6CF',
  nightlife: '#C7CEEA',
  shopping: '#FFDAC1',
};

const categoryEmoji: Record<Category, string> = {
  food: '🍽️',
  museum: '🏛️',
  cafe: '☕',
  landmark: '🗿',
  transit: '🚇',
  nightlife: '🌃',
  shopping: '🛍️',
};

function CityDetailComponent() {
  const { cityId } = Route.useParams();
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: () => mockApi.getCities(),
  });

  const { data: allPlaces } = useQuery({
    queryKey: ['places'],
    queryFn: () => mockApi.getPlaces(),
  });

  const city = cities?.find(c => c.id === cityId);
  const cityPlaces = allPlaces?.filter(p => p.city === cityId);

  const selectedPlace = cityPlaces?.find(p => p.id === selectedPlaceId);

  if (!city) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-text-secondary">City not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Hero Section */}
      <div className="relative h-64 bg-gradient-to-br from-accent-teal/20 to-accent-cyan/20">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        {/* Back Button */}
        <Link to="/" search={{ city: undefined, place: undefined }}>
          <BackButton
            variant="overlay"
            className="absolute left-6 top-12"
            whileTap={{ scale: 0.95 }}
          />
        </Link>

        {/* City Info */}
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-text-primary mb-2">{city.name}</h1>
            <p className="text-text-secondary">{city.country}</p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 mt-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Places" value={String(cityPlaces?.length || 0)} />
          <StatCard label="Rating" value="4.8" />
          <StatCard label="Visitors" value="1.2M" />
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">About {city.name}</h2>
          <p className="text-text-secondary leading-relaxed">
            {city.description}
          </p>
        </div>

        {/* Tags */}
        <div>
          <h2 className="text-lg font-semibold text-text-primary mb-3">Highlights</h2>
          <div className="flex flex-wrap gap-2">
            {city.tags.map((tag) => (
              <Badge
                key={tag}
                variant="surface"
                size="md"
                className="border-white/10 bg-surface text-text-primary"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Places */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">
              Places to Visit ({cityPlaces?.length || 0})
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {cityPlaces?.map((place, index) => (
              <motion.div
                key={place.id}
                onClick={() => setSelectedPlaceId(place.id)}
                className="bg-surface rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                {/* Image */}
                <div className="h-32 relative overflow-hidden">
                  {place.imageUrl ? (
                    <>
                      <img
                        src={place.imageUrl}
                        alt={place.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div
                        className="hidden w-full h-full items-center justify-center text-4xl absolute inset-0"
                        style={{ backgroundColor: categoryColors[place.category] + '30' }}
                      >
                        {categoryEmoji[place.category]}
                      </div>
                    </>
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-4xl"
                      style={{ backgroundColor: categoryColors[place.category] + '30' }}
                    >
                      {categoryEmoji[place.category]}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="text-text-primary font-semibold text-sm mb-1 truncate">
                    {place.name}
                  </h3>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-secondary capitalize">{place.category}</span>
                    <div className="flex items-center gap-1 text-text-secondary">
                      <Star className="w-3 h-3 fill-current" />
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link to="/itinerary">
          <Button fullWidth size="lg" className="mt-6">
            <Plus className="h-5 w-5" />
            Start Planning Trip
          </Button>
        </Link>
      </div>

      {/* Place Detail Sheet */}
      {selectedPlace && (
        <PlaceDetailSheet
          place={selectedPlace}
          isOpen={!!selectedPlaceId}
          onClose={() => setSelectedPlaceId(null)}
          categoryColor={categoryColors[selectedPlace.category]}
          categoryEmoji={categoryEmoji[selectedPlace.category]}
        />
      )}
    </div>
  );
}
