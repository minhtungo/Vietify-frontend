import React from 'react';
import { IconProps } from 'types/icon';
import { BsCircle } from 'react-icons/bs';

import { FC } from 'react';
import cn from '@lib/util/cn';

const CircleIcon: FC<IconProps> = ({ className, ...props }) => {
  return <BsCircle className={cn(className)} {...props} />;
};

export default CircleIcon;
