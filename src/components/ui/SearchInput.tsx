import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  clearable?: boolean;
  containerClassName?: string;
}

export function SearchInput({
  value,
  onChange,
  onClear,
  clearable = false,
  className,
  containerClassName,
  placeholder = 'Search...',
  ...props
}: SearchInputProps) {
  const showClear = clearable && value.length > 0;

  return (
    <div className={cn('relative', containerClassName)}>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full rounded-2xl border border-border bg-surface py-3.5 pl-12 text-text-primary placeholder-text-secondary transition-colors focus:border-accent-cyan focus:outline-none focus:ring-2 focus:ring-accent-cyan/15',
          showClear ? 'pr-12' : 'pr-4',
          className
        )}
        {...props}
      />
      {showClear && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 transition-colors hover:bg-text-primary/5"
        >
          <X className="h-4 w-4 text-text-secondary" />
        </button>
      )}
    </div>
  );
}
