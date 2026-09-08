import { cva, type VariantProps } from 'class-variance-authority';

const tripDateBadgeVariants = cva(
  'flex-shrink-0 w-16 flex flex-col items-center justify-center rounded-xl p-2',
  {
    variants: {
      variant: {
        primary: 'bg-accent-teal text-surface',
        // Completed cards use surface-secondary; surface stays distinct on them.
        neutral: 'bg-surface text-text-primary',
      },
    },
    defaultVariants: { variant: 'primary' },
  }
);

type TripDateBadgeProps = VariantProps<typeof tripDateBadgeVariants> & {
  date: string;
};

export function TripDateBadge({ date, variant }: TripDateBadgeProps) {
  const start = new Date(date);
  return (
    <div className={tripDateBadgeVariants({ variant })}>
      <div className="text-2xl font-bold leading-none">{start.getDate()}</div>
      <div className="text-[10px] uppercase font-semibold mt-0.5">
        {start.toLocaleDateString('en-US', { month: 'short' })}
      </div>
    </div>
  );
}
