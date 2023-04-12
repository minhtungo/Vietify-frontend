import { Fragment, useState, useEffect } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Hamburger from '@modules/common/components/hamburger';
import Logo from '@modules/common/components/logo';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import DropdownMenu from '@modules/layout/components/dropdown-menu';
import MobileMenu from '@modules/mobile-menu/templates';
import SearchBox from '@modules/search/components/search-box';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import { useRouter } from 'next/router';
import DropdownMenuDemo from '@modules/layout/components/dropdown';
import cn from '@lib/util/cn';
import { HiOutlineShoppingBag, HiOutlineUser } from 'react-icons/hi';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@modules/common/components/navigation-menu';
import { ListItem } from './new';
import { BiCategoryAlt } from 'react-icons/bi';

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
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white z-50 mx-auto max-w-8xl px-4 sm:px-6 fixed w-full h-14 flex items-center justify-between">
      <div className="flex">
        <Link href="/">
          <span className="sr-only">Vietify</span>
          <span className="text-xl font-semibold">Vietify</span>
        </Link>
      </div>
      <div className="flex items-center lg:ml-6 gap-4">
        {/* <DropdownMenuDemo /> */}
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
        </NavigationMenu>
        <DesktopSearchModal />
      </div>
      <div className="flex items-center gap-2">
        <div className="flow-root">
          <a href="#" className="group flex items-center">
            <HiOutlineShoppingBag
              className="flex-shrink-0 text-gray-600 group-hover:text-gray-800"
              size={20}
              aria-hidden="true"
            />
            <span className="ml-2 text-sm font-medium text-gray-600 group-hover:text-gray-800">
              0
            </span>
            <span className="sr-only">items in cart, view bag</span>
          </a>
        </div>
        <a href="#" className=" text-gray-600 group-hover:text-gray-800">
          <span className="sr-only">User</span>
          <HiOutlineUser size={20} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}

//   return (
//     <div
//       className={cn(
//         'fixed z-50 h-16 w-full backdrop-filter',
//         isScrolled && 'shadow backdrop-blur-xl border-b border-gray-800/40'
//       )}
//     >
//       <header className="flex items-center justify-between  shadow-sm h-full px-12">
//         <Logo />
//         <DesktopSearchModal />
//         <div className="flex items-center shrink-0">
//           <div className="px-3">
//             <BiUser size={20} className="text-gray-900" />
//           </div>
//           <div className="px-3">
//             <BiCart size={20} className="text-gray-900" />
//           </div>
//           <div className="px-3">
//             <BiHeart size={20} className="text-gray-900" />
//           </div>
//         </div>
//       </header>
//     </div>
//   );
// return (
//   <div
//     className={clsx("sticky top-0 inset-x-0 z-50 group", {
//       "!fixed": isHome,
//     })}
//   >
//     <header
//       className={clsx(
//         "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200",
//         {
//           "!bg-white !border-gray-200": !isHome || isScrolled,
//         }
//       )}
//     >
//       <nav
//         className={clsx(
//           "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
//           {
//             "text-white group-hover:text-gray-900": isHome && !isScrolled,
//           }
//         )}
//       >
//         <div className="flex-1 basis-0 h-full flex items-center">
//           <div className="block small:hidden">
//             <Hamburger setOpen={toggle} />
//           </div>
//           <div className="hidden small:block h-full">
//             <DropdownMenu />
//           </div>
//         </div>

//         <div className="flex items-center h-full">
//           <Link href="/" className="text-xl-semi uppercase">
//             Acme
//           </Link>
//         </div>

//         <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
//           <div className="hidden small:flex items-center gap-x-6 h-full">
//             {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
//             <Link href="/account">
//               Account
//             </Link>
//           </div>
//           <CartDropdown />
//         </div>
//       </nav>
//       <MobileMenu />
//     </header>
//   </div>
// );
// };
