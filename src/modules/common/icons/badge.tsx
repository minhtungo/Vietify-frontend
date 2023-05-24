import cn from '@lib/util/cn';
import { SlBadge } from 'react-icons/sl';
import { IconProps } from 'types/icon';

const Badge: React.FC<IconProps> = ({ className, ...props }) => {
  return <SlBadge className={cn(className)} {...props} />;
};

export default Badge;
