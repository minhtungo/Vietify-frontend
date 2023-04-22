import React from 'react';
import { IconProps } from 'types/icon';
import { IoChevronForward } from 'react-icons/io5';

import { FC } from 'react';
import cn from '@lib/util/cn';

const ChevronRightIcon: FC<IconProps> = ({ className, ...props }) => {
  return <IoChevronForward className={cn(className)} {...props} />;
};

export default ChevronRightIcon;
