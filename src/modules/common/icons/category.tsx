import cn from '@lib/util/cn';
import { BiCategoryAlt } from 'react-icons/bi';
import { IconProps } from 'types/icon';

const CategoryIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <BiCategoryAlt className={cn(className)} {...props} />;
};

export default CategoryIcon;
