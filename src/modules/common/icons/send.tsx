import cn from '@lib/util/cn';
import { RiSendPlaneLine } from 'react-icons/ri';
import { IconProps } from 'types/icon';

const SendIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <RiSendPlaneLine className={cn(className)} {...props} />;
};

export default SendIcon;
