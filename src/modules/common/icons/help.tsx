import cn from '@lib/util/cn';
import { IoIosHelpCircleOutline } from 'react-icons/io';

import { IconProps } from 'types/icon';

interface IoIosHelpCircleOutlineProps extends IconProps {
  className?: string;
}

const Help: React.FC<IoIosHelpCircleOutlineProps> = ({
  className,
  ...props
}) => {
  return <IoIosHelpCircleOutline className={cn(className)} {...props} />;
};

export default Help;
