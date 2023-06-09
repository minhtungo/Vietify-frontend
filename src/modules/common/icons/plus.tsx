import cn from '@lib/util/cn';
import { HiOutlinePlusSm } from 'react-icons/hi';
import { IconProps } from 'types/icon';

const Plus: React.FC<IconProps> = ({ className, ...props }) => {
  return <HiOutlinePlusSm className={cn(className)} {...props} />;
};

export default Plus;
