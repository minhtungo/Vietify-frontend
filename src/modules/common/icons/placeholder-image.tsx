import cn from '@lib/util/cn';
import { IoImageOutline } from 'react-icons/io5';
import { IconProps } from 'types/icon';

const CategoryIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <IoImageOutline className={cn(className)} {...props} />;
};

export default CategoryIcon;
