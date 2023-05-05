import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';
import ReviewRating from '@modules/review/components/review-rating';
import { FC } from 'react';

interface reviewCardProps {
  className?: string;
}

const ReviewCard: FC<reviewCardProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <ReviewRating />
      <Heading variant="small" className="pt-3">
        Title
      </Heading>
      <Text variant="info">Description</Text>
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
