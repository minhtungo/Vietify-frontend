import cn from '@lib/util/cn';
import Link from '@modules/common/components/link';
import { NavigationMenuLink } from '@modules/common/components/navigation-menu';
import React from 'react';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={href!}
        className={cn(
          'block select-none space-y-1 p-4 leading-none no-underline outline-none transition-colors hover:bg-slate-200 focus:bg-slate-200',
          className
        )}
        {...props}
      >
        <span className="text-sm font-medium leading-none text-black">
          {children}
        </span>
      </Link>
    </NavigationMenuLink>
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
