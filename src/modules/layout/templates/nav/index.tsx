import { useMobileMenu } from '@lib/context/mobile-menu-context';
import useScrollDirection from '@lib/hooks/use-scroll-direction';
import cn from '@lib/util/cn';
import Hamburger from '@modules/common/components/hamburger';
import UserIcon from '@modules/common/icons/user';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import Categories from '@modules/layout/templates/nav/categories';
import MobileMenu from '@modules/mobile-menu/templates';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Nav() {
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const scrollDirection = useScrollDirection();

  //useEffect that detects if window is scrolled > 5px on the Y axis
  // useEffect(() => {
  //   if (isHome) {
  //     const detectScrollY = () => {
  //       if (window.scrollY > 5) {
  //         setIsScrolled(true);
  //       } else {
  //         setIsScrolled(false);
  //       }
  //     };

  //     window.addEventListener('scroll', detectScrollY);

  //     return () => {
  //       window.removeEventListener('scroll', detectScrollY);
  //     };
  //   }
  // }, [isHome]);

  useEffect(() => {
    pathname === '/' ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  const { toggle } = useMobileMenu();

  return (
    <header
      className={cn(
        'bg-white z-50 sticky w-full transition-all duration-300 shadow-md',
        scrollDirection === 'down' ? '-top-14' : 'top-0'
      )}
    >
      <div className="max-w-8xl px-4 small:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="sr-only">Vietify</span>
          <span className="text-xl font-semibold">Vietify</span>
        </Link>

        <div className="flex items-center">
          <Categories />
          <DesktopSearchModal />
        </div>

        <div className="flex gap-5 items-start">
          <CartDropdown />
          <Link
            href="/account"
            className=" text-gray-700 group-hover:text-gray-800"
          >
            <UserIcon size={23} aria-hidden="true" />
            <span className="sr-only">User</span>
          </Link>
        </div>
        <div className="small:hidden basis-0 h-full flex items-center">
          <Hamburger setOpen={toggle} />
        </div>
      </div>
      <MobileMenu />
    </header>
  );
}
