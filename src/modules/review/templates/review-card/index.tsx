import cn from '@lib/util/cn';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';
import ReviewRating from '@modules/review/components/review-rating';
import { FC } from 'react';

interface reviewCardProps {
  className?: string;
}

const ReviewCard: FC<reviewCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'mb-6 border-b border-border-base pb-6 last:mb-0 last:border-0',
        className
      )}
    >
      <ReviewRating />
      <Heading size="sm">Title</Heading>
      <Text className="xl:leading-[2em]">Description</Text>
      <div className="pt-2 text-sm text-brand-dark text-opacity-80">
        By
        <Text as="span" className="ml-[3px] inline-block">
          User
        </Text>
      </div>
    </div>
  );
};

export default ReviewCard;
