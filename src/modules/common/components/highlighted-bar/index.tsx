import cn from '@lib/util/cn';
import X from '@modules/common/icons/x';
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
        'h-10 py-2 px-4 md:px-6 lg:px-8 items-center justify-center relative text-sm text-brand-light bg-brand',
        isOpen ? 'flex' : 'hidden',
        className
      )}
    >
      {children}
      <button
        onClick={() => setIsOpen(false)}
        aria-label="Close Button"
        className="absolute flex items-center justify-center transition-colors duration-200 rounded-full outline-none w-7 md:w-8 h-7 md:h-8 right-2 md:right-3 hover:bg-brand-light hover:bg-opacity-10 focus:text-brand-light focus:bg-opacity-10"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default HighlightedBar;
