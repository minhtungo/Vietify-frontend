import React from 'react';
import { IconProps } from 'types/icon';
import { HiCheck } from 'react-icons/hi';

import { FC } from 'react';
import cn from '@lib/util/cn';

const CheckIcon: FC<IconProps> = ({ className, ...props }) => {
  return <HiCheck className={cn(className)} {...props} />;
};

export default CheckIcon;
