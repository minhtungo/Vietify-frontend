import cn from '@lib/util/cn';
import { IoIosHeartEmpty } from 'react-icons/io';
import { IconProps } from 'types/icon';

const HeartIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoIosHeartEmpty className={cn(className)} {...props} />;
};

export default HeartIcon;
