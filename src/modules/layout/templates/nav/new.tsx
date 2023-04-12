import { useMobileMenu } from '@lib/context/mobile-menu-context';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@modules/common/components/navigation-menu';
import cn from '@lib/util/cn';

interface NavProps {}

const links: { title: string; href: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
  },
];

const Nav: FC<NavProps> = ({}) => {
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener('scroll', detectScrollY);

      return () => {
        window.removeEventListener('scroll', detectScrollY);
      };
    }
  }, [isHome]);

  useEffect(() => {
    pathname === '/' ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  const { toggle } = useMobileMenu();
  const [open, setOpen] = useState(false);
  return (
    <NavigationMenu className="bg-white z-50 fixed w-full mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 text-gray-900">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <span className="text-black">Components</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {links.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.title}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700',
            className
          )}
          {...props}
        >
          <span className="text-sm font-medium leading-none text-black">
            {children}
          </span>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export default Nav;
