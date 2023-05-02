import Hamburger from '@common/hamburger';
import { useMobileMenu } from '@lib/context/mobile-menu-context';
import useScrollDirection from '@lib/hooks/use-scroll-direction';
import cn from '@lib/util/cn';
import Logo from '@modules/common/components/logo';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import User from '@modules/layout/components/user';
import Categories from '@modules/layout/templates/nav/categories';
import MobileMenu from '@modules/mobile-menu/templates';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

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

  // useEffect(() => {
  //   pathname === '/' ? setIsHome(true) : setIsHome(false);
  // }, [pathname]);

  const { toggle } = useMobileMenu();

  return (
    <header
      className={cn(
        'sticky z-50 w-full bg-white shadow-md transition-all duration-300',
        scrollDirection === 'down' ? '-top-16' : 'top-0'
      )}
    >
      <div className="flex h-16 max-w-8xl items-center justify-between px-4 small:px-6">
        <Logo />

        <div className="flex items-center">
          <Categories />
          <DesktopSearchModal />
        </div>

        <div className="flex items-start">
          <User />
          <CartDropdown />
        </div>

        <div className="flex h-full basis-0 items-center small:hidden">
          <Hamburger setOpen={toggle} />
        </div>
      </div>
      <MobileMenu />
    </header>
  );
}
