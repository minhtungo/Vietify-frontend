import useScrollDirection from '@lib/hooks/use-scroll-direction';
import cn from '@lib/util/cn';
import Logo from '@modules/common/components/logo';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import Account from '@modules/layout/components/user';
import MobileMenu from '@modules/mobile-menu/templates';
import DesktopSearch from '@modules/search/templates/desktop-search';
import Link from 'next/link';
import HeaderList from './header-list';
import MobileSearch from '@modules/search/templates/mobile-search';
import useWindowSize from '@lib/hooks/use-window-size';
import User from '@modules/common/icons/user';
import Cart from '@modules/common/icons/cart';
import Button, { buttonVariants } from '@modules/ui/button';
import Heart from '@modules/common/icons/heart';

export default function Nav() {
  // const { pathname } = useRouter();
  // const [isHome, setIsHome] = useState(false);

  // useEffect(() => {
  //   pathname === '/' ? setIsHome(true) : setIsHome(false);
  // }, [pathname]);

  const scrollDirection = useScrollDirection();
  const { width } = useWindowSize();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300',
        scrollDirection === 'down' ? '-top-16' : 'top-0'
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-evenly gap-2 px-6 lg:justify-between xl:px-4">
        <div className="flex w-full items-center justify-start gap-5">
          <MobileMenu />
          <Link href="/" className="hidden lg:block">
            <Logo />
          </Link>
          <HeaderList />
        </div>
        <Link href="/" className="block lg:hidden">
          <Logo />
        </Link>
        <div className="flex w-full">
          <DesktopSearch />
          <div className="ml-auto flex items-center gap-1 lg:ml-3 lg:gap-2">
            <MobileSearch />
            {width && width < 1024 ? (
              <>
                <Link
                  href="/account"
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'h-9 w-9 !rounded-full !p-0 !duration-150',
                  })}
                >
                  <User
                    size={23.5}
                    aria-hidden="true"
                    className="text-foreground/90"
                  />
                </Link>
                <Link
                  href="/cart"
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'h-9 w-9 !rounded-full !p-0 !duration-150',
                  })}
                >
                  <Cart
                    className="text-foreground/90"
                    size={25}
                    aria-hidden="true"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/wishlist"
                  className={buttonVariants({
                    variant: 'ghost',
                    className: 'h-9 w-9 !rounded-full !p-0 !duration-150',
                  })}
                >
                  <Heart
                    className="text-foreground/90"
                    size={25}
                    aria-hidden="true"
                  />
                </Link>
                <Account />
                <CartDropdown />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
