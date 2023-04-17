import cn from '@lib/util/cn';
import { IoArrowRedoOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const ShareIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoArrowRedoOutline className={cn(className)} {...props} />;
};

export default ShareIcon;
