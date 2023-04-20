import cn from '@lib/util/cn';
import { IoChevronDown } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const ChevronDown: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoChevronDown className={cn(className)} {...props} />;
};

export default ChevronDown;
