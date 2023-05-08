import cn from '@lib/util/cn';
import { FaInstagram } from 'react-icons/fa';
import { IconProps } from 'types/icon';

const Instagram: React.FC<IconProps> = ({ className, ...props }) => {
  return <FaInstagram className={cn(className)} fill="#833AB4" {...props} />;
};

export default Instagram;
