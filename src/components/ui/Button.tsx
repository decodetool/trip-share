import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-colors focus-ring disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary: "bg-accent-teal text-background",
        // Secondary actions use a tinted fill; neutral surface badges are metadata.
        // Keep variant colors here so callers can switch variants without overrides.
        secondary:
          "bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/20",
        outline:
          "border border-accent-cyan text-accent-cyan hover:bg-accent-cyan/10",
        ghost: "text-text-primary hover:bg-white/5",
      },
      size: {
        default: "px-6 py-3",
        sm: "py-2.5 px-4",
        lg: "px-6 py-4",
        icon: "p-2.5",
        iconSm: "p-2",
        iconLg: "p-3",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      fullWidth: false,
    },
  },
);

export type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> &
  VariantProps<typeof buttonVariants> & {
    children?: React.ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  fullWidth,
  children,
  whileHover,
  whileTap,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      whileHover={whileHover ?? { scale: 1.02 }}
      whileTap={whileTap ?? { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export { buttonVariants };

type FabGlow = "teal" | "cyan";

export type FabProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: React.ReactNode;
  glow?: FabGlow;
};

export function Fab({
  className,
  children,
  glow = "teal",
  whileHover = { scale: 1.05 },
  whileTap = { scale: 0.95 },
  type = "button",
  ...props
}: FabProps) {
  return (
    <motion.button
      type={type}
      className={cn(
        "fixed bottom-24 right-6 z-50 flex items-center justify-center rounded-full bg-accent-teal p-4 text-surface focus-ring",
        glow === "teal" ? "shadow-glow-teal" : "shadow-glow-cyan",
        className,
      )}
      whileHover={whileHover}
      whileTap={whileTap}
      {...props}
    >
      {children}
    </motion.button>
  );
}
