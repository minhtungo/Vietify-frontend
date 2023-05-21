import Link from '@common/link';
import React, { FC } from 'react';

import useBreadcrumb, {
  convertBreadcrumbTitle,
} from '@lib/hooks/use-bread-crumb';
import ArrowForward from '@modules/common/icons/arrow-forward';
import Home from '@modules/common/icons/home';
import { ROUTES } from '@static/routes';
import cn from '@lib/util/cn';

interface Props {
  children: React.ReactNode;
  last?: boolean;
  title?: string;
}
const BreadcrumbItem: FC<Props> = ({ children, last = false, title }) => {
  return (
    <li
      className={cn(
        'inline-flex items-center text-sm text-muted-foreground hover:text-foreground',
        last && 'font-semibold text-foreground'
      )}
    >
      {title && last ? title : children}
      {!last && (
        <ArrowForward className="text-15px mx-1.5 text-muted-foreground" />
      )}
    </li>
  );
};

export const BreadcrumbItems = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const items: any = React.Children.toArray(children);

  const breadcrumbItems = items.map((item: string, index: number) => (
    <BreadcrumbItem
      key={`breadcrumb_item${index}`}
      last={index === items.length - 1}
      title={title}
    >
      {item}
    </BreadcrumbItem>
  ));

  return (
    <ol className="flex w-full items-center overflow-hidden">
      {breadcrumbItems}
    </ol>
  );
};

const Breadcrumb = ({ title }: { title: string }) => {
  const breadcrumbs = useBreadcrumb();

  return (
    <BreadcrumbItems title={title}>
      <Link href={ROUTES.HOME} className="inline-flex items-center gap-1.5">
        <Home className="text-15px text-foreground" />
        Home
      </Link>

      {breadcrumbs?.map((breadcrumb: any) => (
        <Link
          href={breadcrumb.href}
          key={breadcrumb.href}
          className="capitalize"
        >
          {convertBreadcrumbTitle(breadcrumb.breadcrumb)}
        </Link>
      ))}
    </BreadcrumbItems>
  );
};

export default Breadcrumb;
