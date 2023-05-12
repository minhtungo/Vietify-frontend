import Link from '@common/link';
import cn from '@lib/util/cn';
import Text from '@modules/ui/text';
import React from 'react';

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, href, ...props }, ref) => {
  return (
    <Link
      href={href!}
      ref={ref}
      className={cn(
        'block select-none px-4 py-3 transition-colors hover:bg-accent focus:bg-accent',
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
  );
});
ListItem.displayName = 'ListItem';

export default ListItem;
