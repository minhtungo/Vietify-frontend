import cn from '@lib/util/cn';
import { SlBadge } from 'react-icons/sl';
import { IconProps } from 'types/icon';

interface BadgeProps extends IconProps {
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ className, ...props }) => {
  return <SlBadge className={cn(className)} {...props} />;
};

export default Badge;
