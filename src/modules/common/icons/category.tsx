import React from 'react';
import { IconProps } from 'types/icon';
import { BiCategoryAlt } from 'react-icons/bi';

import { FC } from 'react';
import cn from '@lib/util/cn';

const CategoryIcon: FC<IconProps> = ({ className, ...props }) => {
  return <BiCategoryAlt className={cn(className)} {...props} />;
};

export default CategoryIcon;
