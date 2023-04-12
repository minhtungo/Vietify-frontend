import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Hamburger from '@modules/common/components/hamburger';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@modules/common/components/navigation-menu';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import MobileMenu from '@modules/mobile-menu/templates';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiCategoryAlt } from 'react-icons/bi';
import { HiOutlineUser } from 'react-icons/hi';

import { ListItem } from './new';

const navigation = {
  categories: [
    {
      id: 'fiction',
      name: 'Fiction',
      featured: [
        {
          name: 'New Releases',
          href: '#',
          imageSrc:
            'https://images.unsplash.com/photo-1504482389406-9d6c29b29330',
          imageAlt: 'A pile of books with colorful covers on a table',
        },
        {
          name: 'Classics',
          href: '#',
          imageSrc:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba',
          imageAlt: 'Vintage books with leather covers and gold lettering',
        },
      ],
      sections: [
        {
          id: 'literature',
          name: 'Literature',
          items: [
            { name: 'American Literature', href: '#' },
            { name: 'British Literature', href: '#' },
            { name: 'World Literature', href: '#' },
            { name: 'Poetry', href: '#' },
            { name: 'Short Stories', href: '#' },
          ],
        },
        {
          id: 'genre',
          name: 'Genre',
          items: [
            { name: 'Mystery', href: '#' },
            { name: 'Thriller', href: '#' },
            { name: 'Science Fiction', href: '#' },
            { name: 'Fantasy', href: '#' },
            { name: 'Romance', href: '#' },
            { name: 'Horror', href: '#' },
          ],
        },
      ],
    },
    {
      id: 'non-fiction',
      name: 'Non-Fiction',
      featured: [
        {
          name: 'New Releases',
          href: '#',
          imageSrc:
            'https://images.unsplash.com/photo-1589804054338-94c434b03bb2',
          imageAlt: 'A stack of books on a wooden table',
        },
        {
          name: 'Memoirs',
          href: '#',
          imageSrc:
            'https://images.unsplash.com/photo-1609051526205-af7bb2fcf5d5',
          imageAlt: 'A close-up of a pen on a blank page of a journal',
        },
      ],
      sections: [
        {
          id: 'history',
          name: 'History',
          items: [
            { name: 'Ancient History', href: '#' },
            { name: 'Medieval History', href: '#' },
            { name: 'Modern History', href: '#' },
            { name: 'Biographies', href: '#' },
            { name: 'Memoirs', href: '#' },
          ],
        },
        {
          id: 'science',
          name: 'Science',
          items: [
            { name: 'Physics', href: '#' },
            { name: 'Biology', href: '#' },
            { name: 'Astronomy', href: '#' },
            { name: 'Chemistry', href: '#' },
            { name: 'Environment', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
};

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

export default function Nav() {
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

  return (
    <div className="bg-white z-50 mx-auto max-w-8xl px-4 small:px-6 fixed w-full h-14 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/">
          <span className="sr-only">Vietify</span>
          <span className="text-xl font-semibold">Vietify</span>
        </Link>
      </div>

      {/* <DropdownMenuDemo /> */}

      <div className="flex w-2/3 items-center">
        <div className="w-full flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BiCategoryAlt className="text-gray-700" size={26} />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col gap-3 p-4 min-w-[180px]">
                    {links.map((component) => (
                      <ListItem key={component.title} href={component.href}>
                        {component.title}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            <DesktopSearchModal />
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <CartDropdown />
        <Link
          href="/account"
          className=" text-gray-600 group-hover:text-gray-800"
        >
          <span className="sr-only">User</span>
          <HiOutlineUser size={20} aria-hidden="true" />
        </Link>
      </div>
      <div className="small:hidden basis-0 h-full flex items-center">
        <Hamburger setOpen={toggle} />
      </div>
      <MobileMenu />
    </div>
  );
}
