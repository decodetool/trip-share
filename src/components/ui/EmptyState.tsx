import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface EmptyStateProps extends Omit<HTMLMotionProps<'div'>, 'children' | 'title'> {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  initial = { opacity: 0 },
  animate = { opacity: 1 },
  ...props
}: EmptyStateProps) {
  return (
    <motion.div
      initial={initial}
      animate={animate}
      className={cn('text-center py-20', className)}
      {...props}
    >
      <div className="mb-4 flex justify-center text-text-secondary/30">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-text-primary">{title}</h3>
      {description && (
        <p className={cn('text-text-secondary', action && 'mb-6')}>{description}</p>
      )}
      {action}
    </motion.div>
  );
}
