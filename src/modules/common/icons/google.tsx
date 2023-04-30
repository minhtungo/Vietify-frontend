import cn from '@lib/util/cn';
import { FcGoogle } from 'react-icons/fc';
import { IconProps } from 'types/icon';

const Google: React.FC<IconProps> = ({ className, ...props }) => {
  return <FcGoogle className={cn(className)} {...props} />;
};

export default Google;
