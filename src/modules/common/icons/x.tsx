import cn from '@lib/util/cn';
import { IoClose } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const XMarkIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoClose className={cn(className)} {...props} />;
};

export default XMarkIcon;
