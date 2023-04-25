import cn from '@lib/util/cn';
import { IoChevronForward } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const ChevronRightIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoChevronForward className={cn(className)} {...props} />;
};

export default ChevronRightIcon;
