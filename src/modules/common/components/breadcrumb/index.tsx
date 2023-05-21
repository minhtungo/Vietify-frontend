import Link from '@common/link';
import ArrowForwardIcon from '@icons/arrow-forward';
import cn from '@lib/util/cn';
import { FC } from 'react';

import useCrumb from '@lib/hooks/use-crumb';

interface CrumbProps {
  title: string;
  href: string;
  last?: boolean;
}

interface BreadcrumbProps {
  className?: string;
}

const Breadcrumb: FC<BreadcrumbProps> = ({ className }) => {
  const breadcrumbs = useCrumb();

  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 text-sm font-medium capitalize text-muted-foreground">
        {breadcrumbs.map((crumb, idx) => {
          return (
            <Crumb
              key={`crumb-${crumb.title}`}
              {...crumb}
              last={idx === breadcrumbs.length - 1}
            />
          );
        })}
      </ol>
    </nav>
  );
};

const Crumb: FC<CrumbProps> = ({ title, href, last = false }) => {
  if (last) {
    return <li className="font-semibold text-foreground/80">{title}</li>;
  }

  return (
    <li className="flex items-center space-x-1">
      <Link href={href} className="hover:text-primary">
        {title}
      </Link>
      <ArrowForwardIcon size={12} className="text-gray-700" />
    </li>
  );
};

export default Breadcrumb;
