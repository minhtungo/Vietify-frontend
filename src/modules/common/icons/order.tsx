import cn from '@lib/util/cn';
import { BsBagCheck } from 'react-icons/bs';

import { IconProps } from 'types/icon';

interface Props extends IconProps {
  className?: string;
}

const Order: React.FC<Props> = ({ className, ...props }) => {
  return <BsBagCheck className={cn(className)} {...props} />;
};

export default Order;
