import cn from '@lib/util/cn';
import { BsCircle } from 'react-icons/bs';
import { IconProps } from 'types/icon';

const CircleIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <BsCircle className={cn(className)} {...props} />;
};

export default CircleIcon;
