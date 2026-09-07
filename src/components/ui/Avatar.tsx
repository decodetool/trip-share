import { cn } from '@/lib/utils';

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-20 h-20 text-4xl',
  '2xl': 'w-24 h-24 text-3xl',
} as const;

const overlapClasses = {
  xs: '-space-x-1.5',
  sm: '-space-x-2',
  md: '-space-x-2',
  lg: '-space-x-2',
  xl: '-space-x-3',
  '2xl': '-space-x-4',
} as const;

type AvatarSize = keyof typeof sizeClasses;
type AvatarFallback = 'gradient' | 'cyan';

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  fallback?: AvatarFallback;
  className?: string;
  bordered?: boolean;
  children?: React.ReactNode;
}

function fallbackInitial(name?: string, alt?: string) {
  const source = name || alt || '';
  return source.charAt(0) || '?';
}

export function Avatar({
  src,
  alt,
  name,
  size = 'md',
  fallback = 'gradient',
  className,
  bordered = false,
  children,
}: AvatarProps) {
  const initial = fallbackInitial(name, alt);
  const fallbackClasses =
    fallback === 'cyan'
      ? 'bg-accent-cyan text-surface'
      : 'bg-gradient-to-br from-accent-teal to-accent-cyan text-white';

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full',
        sizeClasses[size],
        bordered && 'border-2 border-background',
        !src && fallbackClasses,
        src && 'bg-surface',
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || name || ''} className="h-full w-full object-cover" />
      ) : children ? (
        children
      ) : (
        <span className="font-semibold">{initial}</span>
      )}
    </div>
  );
}

export interface AvatarGroupProps {
  children: React.ReactNode;
  size?: AvatarSize;
  max?: number;
  total?: number;
  className?: string;
}

export function AvatarGroup({
  children,
  size = 'md',
  max,
  total,
  className,
}: AvatarGroupProps) {
  const items = Array.isArray(children) ? children : [children];
  const visible = max != null ? items.slice(0, max) : items;
  const overflow =
    total != null
      ? Math.max(total - visible.length, 0)
      : max != null
        ? Math.max(items.length - max, 0)
        : 0;

  return (
    <div className={cn('flex', overlapClasses[size], className)}>
      {visible}
      {overflow > 0 && (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-full border-2 border-background bg-surface-secondary font-semibold text-text-secondary',
            sizeClasses[size]
          )}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
