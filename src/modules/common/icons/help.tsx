import cn from '@lib/util/cn';
import { IoIosHelpCircleOutline } from 'react-icons/io';

import { IconProps } from 'types/icon';

const Help: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoIosHelpCircleOutline className={cn(className)} {...props} />;
};

export default Help;
