import React from 'react';
import { IconProps } from 'types/icon';
import { BiCategoryAlt } from 'react-icons/bi';

import { FC } from 'react';
import cn from '@lib/util/cn';

interface CategoryProps extends IconProps {
  className?: string;
}

const CategoryIcon: FC<CategoryProps> = ({ className, ...props }) => {
  return <BiCategoryAlt className={cn(className)} {...props} />;
};

export default CategoryIcon;
