import cn from '@lib/util/cn';
import Heading from '@ui/heading';
import Text from '@ui/text';
import ReviewRating from '@modules/review/components/review-rating';
import { FC } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';

interface reviewCardProps {
  className?: string;
}

const ReviewCard: FC<reviewCardProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>TM</AvatarFallback>
        </Avatar>
        <div className="">
          <Heading variant="small" className="text-sm">
            Minh Tu Ngo
          </Heading>
          <Text variant="info">July 16, 2021</Text>
        </div>
      </div>

      <ReviewRating className="pt-2" />
      <Text variant="info" className="pt-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum tempore
        optio velit asperiores exercitationem repellendus dolore accusamus cum
        fugiat ullam? Obcaecati labore quidem maiores dolor fugiat, amet
        repellat excepturi saepe!
      </Text>
    </div>
  );
};

export default ReviewCard;
