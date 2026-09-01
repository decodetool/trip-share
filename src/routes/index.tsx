import { createFileRoute } from '@tanstack/react-router';
import { DiscoverComponent } from './discover';

export const Route = createFileRoute('/')({
  component: DiscoverComponent,
  validateSearch: (search: Record<string, unknown>) => ({
    city: (search.city as string) || undefined,
    place: (search.place as string) || undefined,
  }),
  beforeLoad: () => {
    document.title = 'Discover - Journeys';
  },
});
