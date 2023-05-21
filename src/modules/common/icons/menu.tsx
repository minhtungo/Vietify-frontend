import cn from '@lib/util/cn';
import { IoIosMenu } from 'react-icons/io';
import { IconProps } from 'types/icon';

interface BadgeProps extends IconProps {
  className?: string;
}

const Menu: React.FC<BadgeProps> = ({ className, ...props }) => {
  return <IoIosMenu className={cn(className)} {...props} />;
};

export default Menu;
