import cn from '@lib/util/cn';
import { HiOutlineStar } from 'react-icons/hi';
import { IconProps } from 'types/icon';

const StarIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <HiOutlineStar className={cn(className)} {...props} />;
};

export default StarIcon;
