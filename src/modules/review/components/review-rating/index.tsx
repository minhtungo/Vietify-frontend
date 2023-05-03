import cn from '@lib/util/cn';
import StarIcon from '@icons/star';
import { FC } from 'react';

interface ReviewRatingProps {
  className?: string;
}

const ReviewRating: FC<ReviewRatingProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      <StarIcon className="h-4 w-4 text-yellow-400 " />
      <span className="ml-2 text-xs font-semibold text-gray-700 ">10</span>
    </div>
  );
};

export default ReviewRating;
