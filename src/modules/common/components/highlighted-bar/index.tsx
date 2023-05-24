import cn from '@lib/util/cn';
import X from '@icons/x';
import { useState } from 'react';
import Button from '@modules/ui/button';
import { SwiperSlide } from '@modules/carousel/components/slider';
import Carousel from '@modules/carousel/templates';
import { ANNOUNCEMENTS } from '@static/annoucement';

interface indexProps {
  className?: string;
}

const HighlightedBar: React.FC<indexProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div
      className={cn(
        'relative bg-brand px-4 py-2.5',
        isOpen ? 'flex' : 'hidden',
        className
      )}
    >
      <div className="mx-auto flex w-full items-center justify-center text-xs text-primary-foreground sm:text-sm">
        {ANNOUNCEMENTS.length > 1 ? (
          <Carousel
            autoplay={{ delay: 4000 }}
            className="w-full max-w-3xl text-center"
            loop
            speed={1000}
            prevActivateId="prev-announcement"
            nextActivateId="next-announcement"
            prevButtonClassName="announcement-button left-2 lg:left-2.5"
            nextButtonClassName="announcement-button right-2 lg:right-2.5"
          >
            {ANNOUNCEMENTS.map((item) => (
              <SwiperSlide
                key={`announcement-${item.id}`}
                className="!mx-auto !text-center"
              >
                <p className="text-center">{item.title}</p>
              </SwiperSlide>
            ))}
          </Carousel>
        ) : (
          <span>{ANNOUNCEMENTS[0].title}</span>
        )}
      </div>

      <Button
        variant="ghost"
        onClick={() => setIsOpen(false)}
        aria-label="Close Button"
        className="absolute right-2 h-5 w-5 rounded-full p-0 text-primary-foreground  hover:bg-accent/20 hover:text-primary-foreground sm:h-6 sm:w-6 md:right-3"
      >
        <X className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
    </div>
  );
};

export default HighlightedBar;
