import cn from '@lib/util/cn';
import { HiOutlineFunnel } from 'react-icons/hi2';
import { IconProps } from 'types/icon';

const FunnelIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <HiOutlineFunnel className={cn(className)} {...props} />;
};

export default FunnelIcon;
