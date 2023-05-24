import cn from '@lib/util/cn';
import { MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import { IconProps } from 'types/icon';

const DoubleArrow: React.FC<IconProps> = ({ className, ...props }) => {
  return (
    <MdOutlineKeyboardDoubleArrowRight className={cn(className)} {...props} />
  );
};

export default DoubleArrow;
