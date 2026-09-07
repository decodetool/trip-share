import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface StatCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  label: string;
  value: string;
}

export function StatCard({
  label,
  value,
  className,
  whileHover = { y: -2 },
  transition = { type: 'spring', stiffness: 300, damping: 20 },
  ...props
}: StatCardProps) {
  return (
    <motion.div
      className={cn(
        'rounded-2xl border border-white/5 bg-surface p-4 text-center',
        className
      )}
      whileHover={whileHover}
      transition={transition}
      {...props}
    >
      <p className="font-mono text-2xl font-bold text-text-primary">{value}</p>
      <p className="mt-1 text-xs text-text-secondary">{label}</p>
    </motion.div>
  );
}
