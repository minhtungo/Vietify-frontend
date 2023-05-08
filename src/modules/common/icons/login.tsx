import cn from '@lib/util/cn';
import { IoLogInOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const LogIn: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoLogInOutline className={cn(className)} {...props} />;
};

export default LogIn;
