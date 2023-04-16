import { IconProps } from 'types/icon';
import { BiSearch } from 'react-icons/bi';

import cn from '@lib/util/cn';

const SearchIcon: React.FC<IconProps> = ({ className, ...props }) => {
  return <BiSearch className={cn(className)} {...props} />;
};

export default SearchIcon;
