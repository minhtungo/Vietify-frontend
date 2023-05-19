import cn from '@lib/util/cn';
import X from '@icons/x';
import { useState } from 'react';
import Button from '@modules/ui/button';

interface indexProps {
  children: React.ReactNode;
  className?: string;
}

const HighlightedBar: React.FC<indexProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div
      className={cn(
        'relative items-center justify-center bg-brand px-3 py-1.5 text-xs text-primary-foreground sm:px-3.5 sm:py-2 sm:text-sm',
        isOpen ? 'flex' : 'hidden',
        className
      )}
    >
      {children}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(false)}
        aria-label="Close Button"
        className="absolute right-2 h-5 w-5 rounded-full p-0 duration-150 hover:bg-accent/20 hover:text-primary-foreground sm:h-6 sm:w-6 md:right-3"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default HighlightedBar;
