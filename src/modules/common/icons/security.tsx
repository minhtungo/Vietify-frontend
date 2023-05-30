import cn from '@lib/util/cn';
import { RiLockPasswordLine } from 'react-icons/ri';
import { IconProps } from 'types/icon';

const Security: React.FC<IconProps> = ({ className, ...props }) => {
  return <RiLockPasswordLine className={cn(className)} {...props} />;
};

export default Security;
