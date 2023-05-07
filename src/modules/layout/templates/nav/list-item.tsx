import cn from '@lib/util/cn';
import Link from '@common/link';
import { NavigationMenuLink } from '@ui/navigation-menu';
import React from 'react';
import Text from '@modules/ui/text';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href!}
          className={cn(
            'block select-none space-y-1 px-4 py-3 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent',
            className
          )}
          {...props}
        >
          <Text
            className="text-sm font-medium leading-none text-foreground"
            as="span"
          >
            {children}
          </Text>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
