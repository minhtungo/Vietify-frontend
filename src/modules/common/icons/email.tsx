import cn from '@lib/util/cn';
import { HiOutlineMail } from 'react-icons/hi';
import { IconProps } from 'types/icon';

const EmailIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <HiOutlineMail className={cn(className)} {...props} />;
};

export default EmailIcon;
