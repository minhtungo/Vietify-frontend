import cn from '@lib/util/cn';
import { IoCartOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const Cart: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoCartOutline className={cn(className)} {...props} />;
};

export default Cart;
