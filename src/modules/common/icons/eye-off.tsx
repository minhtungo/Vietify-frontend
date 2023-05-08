import cn from '@lib/util/cn';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { IconProps } from 'types/icon';

const EyeOff: React.FC<IconProps> = ({ className, ...props }) => {
  return <AiOutlineEyeInvisible className={cn(className)} {...props} />;
};

export default EyeOff;
