import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-2 overflow-x-auto scrollbar-hide', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <motion.button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-2 rounded-2xl text-sm font-medium whitespace-nowrap transition-colors focus-ring',
              isActive
                ? 'text-surface'
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary/60'
            )}
            whileTap={{ scale: 0.95 }}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabBg"
                className="absolute inset-0 bg-accent-cyan rounded-2xl"
                transition={{ duration: 0.18, ease: 'easeOut' }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-semibold',
                    isActive
                      ? 'bg-surface/20 text-surface'
                      : 'bg-surface-secondary text-text-secondary'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
