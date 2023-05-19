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
        'relative items-center justify-center bg-brand px-6 py-2 text-sm text-primary-foreground sm:px-3.5',
        isOpen ? 'flex' : 'hidden',
        className
      )}
    >
      {children}
      <Button
        variant="ghost"
        onClick={() => setIsOpen(false)}
        aria-label="Close Button"
        className="absolute right-2 h-6 w-6 rounded-full p-0 duration-150 hover:bg-accent/20 hover:text-primary-foreground md:right-3"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default HighlightedBar;
