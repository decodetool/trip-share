import { cva, type VariantProps } from 'class-variance-authority';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconButtonVariants = cva(
  'inline-flex items-center justify-center transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        ghost: 'rounded-xl p-2 text-text-primary hover:bg-white/5',
        overlay:
          'rounded-xl border border-white/10 bg-background/80 p-2 text-text-primary backdrop-blur-sm',
        surface:
          'relative rounded-xl border border-border bg-surface p-2.5 text-text-primary hover:border-text-secondary/40',
        primary: 'rounded-2xl bg-accent-teal p-3 text-background',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

export type IconButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> &
  VariantProps<typeof iconButtonVariants> & {
    children?: React.ReactNode;
    label: string;
  };

export function IconButton({
  className,
  variant,
  children,
  label,
  whileHover,
  whileTap,
  type = 'button',
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      type={type}
      aria-label={label}
      className={cn(iconButtonVariants({ variant }), className)}
      whileHover={whileHover ?? { scale: 1.05 }}
      whileTap={whileTap ?? { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export type BackButtonProps = Omit<IconButtonProps, 'children' | 'label' | 'variant'> & {
  variant?: 'ghost' | 'overlay';
  label?: string;
};

export function BackButton({
  variant = 'ghost',
  label = 'Go back',
  ...props
}: BackButtonProps) {
  return (
    <IconButton variant={variant} label={label} {...props}>
      <ArrowLeft size={20} className="text-text-primary" />
    </IconButton>
  );
}

export { iconButtonVariants };
