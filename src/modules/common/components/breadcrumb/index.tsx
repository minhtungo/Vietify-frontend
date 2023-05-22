import Link from '@common/link';
import React, { FC } from 'react';

import useBreadcrumb, {
  breadCrumbType,
  convertBreadcrumbTitle,
} from '@lib/hooks/use-bread-crumb';
import cn from '@lib/util/cn';
import ArrowForward from '@modules/common/icons/arrow-forward';
import Home from '@modules/common/icons/home';
import { ROUTES } from '@static/routes';

interface BreadcrumbItemProps {
  children: React.ReactNode;
  last?: boolean;
}
interface BreadcrumbProps {
  title?: string;
}

const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  children,
  last = false,
}) => {
  return (
    <li
      className={cn(
        'inline-flex items-center text-sm text-muted-foreground hover:text-foreground',
        last && 'font-semibold text-foreground'
      )}
    >
      {children}
      {!last && (
        <ArrowForward className="text-15px mx-1.5 text-muted-foreground" />
      )}
    </li>
  );
};

const Breadcrumb: FC<BreadcrumbProps> = ({ title }) => {
  const breadcrumbs = useBreadcrumb();

  return (
    <ol className="flex w-full items-center overflow-hidden">
      <BreadcrumbItem key="breadcrumb-home">
        <Link href={ROUTES.HOME} className="inline-flex items-center gap-1.5">
          <Home className="text-15px text-foreground" />
          Home
        </Link>
      </BreadcrumbItem>
      {breadcrumbs?.map((breadcrumb: breadCrumbType, i: number) => (
        <BreadcrumbItem
          key={breadcrumb.href}
          last={i === breadcrumbs.length - 1}
        >
          <Link href={breadcrumb.href} className="capitalize">
            {title && i === breadcrumbs.length - 1
              ? title
              : convertBreadcrumbTitle(breadcrumb.breadcrumb)}
          </Link>
        </BreadcrumbItem>
      ))}
    </ol>
  );
};

export default Breadcrumb;
