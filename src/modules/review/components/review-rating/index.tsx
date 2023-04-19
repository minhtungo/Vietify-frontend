import cn from '@lib/util/cn';
import StarIcon from '@modules/common/icons/star';
import { FC } from 'react';

interface ReviewRatingProps {
  className?: string;
}

const ReviewRating: FC<ReviewRatingProps> = ({ className }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      <StarIcon className="w-4 h-4 text-yellow-400 " />
      <p className="ml-2 text-xs font-medium text-gray-700 ">10</p>
    </div>
  );
};

export default ReviewRating;
