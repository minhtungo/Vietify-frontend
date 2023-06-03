import cn from '@lib/util/cn';
import { NavigationMenuLink } from '@modules/ui/navigation-menu';
import React from 'react';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, href, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        href={href!}
        ref={ref}
        className={cn(
          'block select-none rounded-sm px-4 py-2 text-[15px] font-medium transition-colors hover:bg-accent focus:bg-accent',
          className
        )}
        {...props}
      >
        {children}
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
