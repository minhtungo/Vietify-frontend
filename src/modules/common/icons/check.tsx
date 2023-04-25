import cn from '@lib/util/cn';
import { HiCheck } from 'react-icons/hi';
import { IconProps } from 'types/icon';

const CheckIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <HiCheck className={cn(className)} {...props} />;
};

export default CheckIcon;
