import cn from '@lib/util/cn';
import { AiOutlineUser } from 'react-icons/ai';
import { IconProps } from 'types/icon';

const User: React.FC<IconProps> = ({ className, ...props }) => {
  return <AiOutlineUser className={cn(className)} {...props} />;
};

export default User;
