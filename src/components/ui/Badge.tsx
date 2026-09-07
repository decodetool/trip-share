import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        cyan: 'bg-accent-cyan/20 text-accent-cyan',
        teal: 'bg-accent-teal/20 text-accent-teal',
        muted: 'bg-text-secondary/20 text-text-secondary',
        surface: 'border border-border bg-background text-text-secondary',
        outlineCyan:
          'border border-accent-cyan/20 bg-accent-cyan/10 text-accent-cyan',
        glass: 'border border-white/20 bg-white/20 text-white',
      },
      size: {
        default: 'px-3 py-1 text-xs',
        sm: 'px-2.5 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'cyan',
      size: 'default',
    },
  }
);

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}

export type CountBadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  count: number | string;
};

export function CountBadge({ count, className, ...props }: CountBadgeProps) {
  return (
    <span
      className={cn(
        'absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent-teal text-xs font-bold text-surface',
        className
      )}
      {...props}
    >
      {count}
    </span>
  );
}

export { badgeVariants };
