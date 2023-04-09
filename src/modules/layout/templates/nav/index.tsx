import { Fragment, useState, useEffect } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import clsxm from '@lib/clsxm';
import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Hamburger from '@modules/common/components/hamburger';
import Logo from '@modules/common/components/logo';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import DropdownMenu from '@modules/layout/components/dropdown-menu';
import MobileMenu from '@modules/mobile-menu/templates';
import SearchBox from '@modules/search/components/search-box';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import { useRouter } from 'next/router';

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
    <div className="bg-white z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            clsxm(
                              selected
                                ? 'border-indigo-600 text-indigo-600'
                                : 'border-transparent text-gray-900',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <Image
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  width={500}
                                  height={500}
                                  className="object-cover object-center"
                                />
                              </div>
                              <a
                                href={item.href}
                                className="mt-6 block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900"
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a
                                    href={item.href}
                                    className="-m-2 block p-2 text-gray-500"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <a
                        href={page.href}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>
                {/* 
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Create account
                    </a>
                  </div>
                </div> */}

                {/* <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <Image
                      src=""
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900">
                      CAD
                    </span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white z-50">
        {/* <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over $100
        </p> */}

        <nav
          aria-label="Top"
          className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">Vietify</span>
                  <span className="text-xl font-semibold">Vietify</span>
                  {/* <Image
                    className="h-8 w-auto"
                    src=""
                    alt=""
                  /> */}
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={clsxm(
                                open
                                  ? 'border-indigo-600 text-indigo-600'
                                  : 'border-transparent text-gray-700 hover:text-gray-800',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <Image
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              width={500}
                                              height={500}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900"
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <a
                                                  href={item.href}
                                                  className="hover:text-gray-800"
                                                >
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                {/* Currency */}
                {/* <div className="hidden lg:ml-8 lg:flex">
                  <a
                    href="#"
                    className="flex items-center text-gray-700 hover:text-gray-800"
                  >
                    <Image
                      src=""
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">CAD</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div> */}
                {/* Search */}

                <div className="flex lg:ml-6">
                  <DesktopSearchModal />
                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <a href="#" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      0
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
                {/* Authentication */}
                <div className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                    <span className="sr-only">User</span>
                    <UserIcon className="h-6 w-6" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}

//   return (
//     <div
//       className={clsxm(
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
