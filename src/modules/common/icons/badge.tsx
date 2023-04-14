import React from 'react';
import { IconProps } from 'types/icon';
import { SlBadge } from 'react-icons/sl';

import { FC } from 'react';
import cn from '@lib/util/cn';

interface BadgeProps extends IconProps {
  className?: string;
}

const Badge: FC<BadgeProps> = ({ className, ...props }) => {
  return <SlBadge className={cn(className)} {...props} />;
};

export default Badge;
