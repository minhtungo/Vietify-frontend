import cn from '@lib/util/cn';
import { IoLogOutOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const LogOut: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoLogOutOutline className={cn(className)} {...props} />;
};

export default LogOut;
