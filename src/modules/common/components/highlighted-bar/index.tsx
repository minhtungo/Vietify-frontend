import cn from '@lib/util/cn';
import X from '@icons/x';
import { useState } from 'react';

interface indexProps {
  children: React.ReactNode;
  className?: string;
}

const HighlightedBar: React.FC<indexProps> = ({ children, className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div
      className={cn(
        'relative h-10 items-center justify-center bg-brand px-4 py-2 text-sm text-brand-light md:px-6 lg:px-8',
        isOpen ? 'flex' : 'hidden',
        className
      )}
    >
      {children}
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Close Button"
        className="absolute right-2 flex h-7 w-7 items-center justify-center rounded-full outline-none transition-colors duration-200 hover:bg-brand-light hover:bg-opacity-10 focus:bg-opacity-10 focus:text-brand-light md:right-3 md:h-8 md:w-8"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HighlightedBar;
