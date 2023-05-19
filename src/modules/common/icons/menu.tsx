import cn from '@lib/util/cn';
import { AiOutlineMenu } from 'react-icons/ai';
import { IconProps } from 'types/icon';

interface BadgeProps extends IconProps {
  className?: string;
}

const Menu: React.FC<BadgeProps> = ({ className, ...props }) => {
  return <AiOutlineMenu className={cn(className)} {...props} />;
};

export default Menu;
