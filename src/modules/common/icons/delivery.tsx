import cn from '@lib/util/cn';
import { TbTruckDelivery } from 'react-icons/tb';
import { IconProps } from 'types/icon';

const Delivery: React.FC<IconProps> = ({ className, ...props }) => {
  return <TbTruckDelivery className={cn(className)} {...props} />;
};

export default Delivery;
