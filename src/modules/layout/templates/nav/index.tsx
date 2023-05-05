import Hamburger from '@common/hamburger';
import { useMobileMenu } from '@lib/context/mobile-menu-context';
import useScroll from '@lib/hooks/use-scroll';
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
import { useState, useEffect } from 'react';

export default function Nav() {
  const { pathname } = useRouter();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    pathname === '/' ? setIsHome(true) : setIsHome(false);
  }, [pathname]);

  const isScrolled = useScroll(isHome);

  const { toggle } = useMobileMenu();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white shadow-md transition-all duration-300'
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-4 small:px-6">
        <Link href="/" className="hidden md:block">
          <Logo />
        </Link>

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
