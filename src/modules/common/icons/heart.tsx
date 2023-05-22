import cn from '@lib/util/cn';
import { AiOutlineHeart } from 'react-icons/ai';
import { IconProps } from 'types/icon';

const Heart: React.FC<IconProps> = ({ className, ...props }) => {
  return <AiOutlineHeart className={cn(className)} {...props} />;
};

export default Heart;
