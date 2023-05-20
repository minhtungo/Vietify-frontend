import cn from '@lib/util/cn';
import { IoIosArrowForward } from 'react-icons/io';
import { IconProps } from 'types/icon';

const ArrowForward: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoIosArrowForward className={cn(className)} {...props} />;
};

export default ArrowForward;
