import cn from '@lib/util/cn';
import { BsBagCheck } from 'react-icons/bs';

import { IconProps } from 'types/icon';

const Order: React.FC<IconProps> = ({ className, ...props }) => {
  return <BsBagCheck className={cn(className)} {...props} />;
};

export default Order;
