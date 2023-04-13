import React from 'react';
import { IconProps } from 'types/icon';
import { BiSearch } from 'react-icons/bi';

import { FC } from 'react';
import cn from '@lib/util/cn';

interface SearchProps extends IconProps {
  className?: string;
}

const Search: FC<SearchProps> = ({ className, ...props }) => {
  return <BiSearch className={cn(className)} {...props} />;
};

export default Search;
