import cn from '@lib/util/cn';
import { IoPersonOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const UserIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoPersonOutline className={cn(className)} {...props} />;
};

export default UserIcon;
