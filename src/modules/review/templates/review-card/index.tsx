import cn from '@lib/util/cn';
import Heading from '@modules/common/components/heading';
import Text from '@modules/common/components/text';
import ReviewRating from '@modules/review/components/review-rating';
import { FC } from 'react';

interface reviewCardProps {
  className?: string;
}

const ReviewCard: FC<reviewCardProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'border-b border-border-base last:border-0 pb-6 mb-6 last:mb-0',
        className
      )}
    >
      <ReviewRating />
      <Heading size="sm">Title</Heading>
      <Text className="xl:leading-[2em]">Description</Text>
      <div className="pt-2 text-sm text-brand-dark text-opacity-80">
        By
        <Text as="span" className="inline-block ml-[3px]">
          User
        </Text>
      </div>
    </div>
  );
};

export default ReviewCard;
