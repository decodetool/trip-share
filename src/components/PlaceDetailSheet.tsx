import { BottomSheet } from './ui/BottomSheet';
import { Button } from '@/components/ui/Button';
import { MapPin, Clock, Star, Plus, ExternalLink } from 'lucide-react';
import type { Place } from '@/types';
import { useState } from 'react';

interface PlaceDetailSheetProps {
  place: Place | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToItinerary?: (placeId: string) => void;
  categoryColor: string;
  categoryEmoji: string;
}

export function PlaceDetailSheet({
  place,
  isOpen,
  onClose,
  onAddToItinerary,
  categoryColor,
  categoryEmoji
}: PlaceDetailSheetProps) {
  const [imageError, setImageError] = useState(false);

  if (!place) return null;

  return (
    <BottomSheet
      isOpen={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <div>
        {/* Hero Image with Title Overlay */}
        <div className="relative">
          {place.imageUrl && !imageError ? (
            <div className="relative h-36 overflow-hidden rounded-t-3xl">
              <img
                src={place.imageUrl}
                alt={place.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

              {/* Title and Category Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h2 className="text-lg font-bold text-white flex-1">{place.name}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/20"
                  >
                    <span>{categoryEmoji}</span>
                    <span className="capitalize text-white">{place.category}</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="h-36 flex flex-col items-center justify-center text-4xl rounded-t-3xl"
              style={{ backgroundColor: categoryColor + '20' }}
            >
              <div className="mb-2">{categoryEmoji}</div>
              <div className="absolute bottom-3 left-3 right-3">
                <h2 className="text-lg font-bold text-text-primary mb-1">{place.name}</h2>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5"
                  style={{ backgroundColor: categoryColor + '30', color: categoryColor }}
                >
                  <span>{categoryEmoji}</span>
                  <span className="capitalize">{place.category}</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-4 pt-3 pb-4 space-y-2.5">

        {/* Quick Info */}
        <div className="grid grid-cols-3 gap-2">
          <InfoCard
            icon={<Star className="w-3.5 h-3.5" />}
            label="Rating"
            value="4.8"
          />
          <InfoCard
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Duration"
            value="1-2h"
          />
          <InfoCard
            icon={<MapPin className="w-3.5 h-3.5" />}
            label="Distance"
            value="2.3km"
          />
        </div>

        {/* Description */}
        <div className="bg-surface/50 rounded-xl p-3 border border-white/5">
          <p className="text-text-primary text-sm leading-relaxed">
            {place.description || `Tokyo's oldest and most significant Buddhist temple`}
          </p>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-2 gap-2">
          {/* Hours */}
          <div className="bg-surface/50 rounded-xl p-2.5 border border-white/5">
            <div className="flex items-center gap-1.5 text-text-secondary mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Hours</span>
            </div>
            <p className="text-text-primary text-sm font-medium">
              9AM - 10PM
            </p>
          </div>

          {/* Price Level */}
          <div className="bg-surface/50 rounded-xl p-2.5 border border-white/5">
            <div className="flex items-center gap-1.5 text-text-secondary mb-0.5">
              <span className="text-xs font-medium">Price</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-accent-teal text-base font-medium">$$</span>
              <span className="text-text-secondary/30 text-base">$$</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              onAddToItinerary?.(place.id);
              onClose();
            }}
          >
            <Plus className="h-4 w-4" />
            Add to Itinerary
          </Button>
          <Button variant="secondary" size="icon" className="shrink-0">
            <ExternalLink className="h-4 w-4 text-text-primary" />
          </Button>
        </div>
        </div>
      </div>
    </BottomSheet>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-surface rounded-xl p-2 border border-white/5">
      <div className="flex items-center gap-1 text-text-secondary mb-0.5">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </div>
  );
}
