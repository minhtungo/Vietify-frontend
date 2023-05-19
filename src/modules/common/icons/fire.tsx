import cn from '@lib/util/cn';
import { AiOutlineFire } from 'react-icons/ai';
import { IconProps } from 'types/icon';

const Fire: React.FC<IconProps> = ({ className, ...props }) => {
  return <AiOutlineFire className={cn(className)} {...props} />;
};

export default Fire;
