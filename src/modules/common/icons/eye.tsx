import cn from '@lib/util/cn';
import { AiOutlineEye } from 'react-icons/ai';
import { IconProps } from 'types/icon';

const Eye: React.FC<IconProps> = ({ className, ...props }) => {
  return <AiOutlineEye className={cn(className)} {...props} />;
};

export default Eye;
