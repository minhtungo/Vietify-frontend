import cn from '@lib/util/cn';
import { HiOutlineMinusSm } from 'react-icons/hi';
import { IconProps } from 'types/icon';

const MinusIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <HiOutlineMinusSm className={cn(className)} {...props} />;
};

export default MinusIcon;
