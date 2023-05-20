import cn from '@lib/util/cn';
import { IoIosArrowBack } from 'react-icons/io';
import { IconProps } from 'types/icon';

const ArrowBack: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoIosArrowBack className={cn(className)} {...props} />;
};

export default ArrowBack;
