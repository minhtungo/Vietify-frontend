import cn from '@lib/util/cn';
import { IoIosMenu } from 'react-icons/io';
import { IconProps } from 'types/icon';

const Menu: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoIosMenu className={cn(className)} {...props} />;
};

export default Menu;
