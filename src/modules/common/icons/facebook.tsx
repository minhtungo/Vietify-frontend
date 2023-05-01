import cn from '@lib/util/cn';
import { FaFacebook } from 'react-icons/fa';
import { IconProps } from 'types/icon';

const Facebook: React.FC<IconProps> = ({ className, ...props }) => {
  return <FaFacebook className={cn(className)} fill="#4267B2" {...props} />;
};

export default Facebook;
