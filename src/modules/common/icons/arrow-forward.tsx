import cn from '@lib/util/cn';
import { IoIosArrowForward } from 'react-icons/io';
import { IconProps } from 'types/icon';

const ArrowForwardIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoIosArrowForward className={cn(className)} {...props} />;
};

export default ArrowForwardIcon;
