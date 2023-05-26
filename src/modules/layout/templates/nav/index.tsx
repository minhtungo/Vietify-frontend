import useScrollDirection from '@lib/hooks/use-scroll-direction';
import cn from '@lib/util/cn';
import Logo from '@modules/common/components/logo';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import User from '@modules/layout/components/user';
import MobileMenu from '@modules/mobile-menu/templates';
import DesktopSearch from '@modules/search/templates/desktop-search';
import Link from 'next/link';
import HeaderList from './header-list';
import MobileSearch from '@modules/search/templates/mobile-search';

export default function Nav() {
  // const { pathname } = useRouter();
  // const [isHome, setIsHome] = useState(false);

  // useEffect(() => {
  //   pathname === '/' ? setIsHome(true) : setIsHome(false);
  // }, [pathname]);

  const scrollDirection = useScrollDirection();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300',
        scrollDirection === 'down' ? '-top-16' : 'top-0'
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-evenly gap-2 px-6 lg:justify-between xl:px-4">
        <div className="flex w-full items-center gap-6 lg:w-fit">
          <MobileMenu />
          <Link href="/" className="hidden lg:block">
            <Logo />
          </Link>
          <HeaderList />
        </div>
        <Link href="/" className="block lg:hidden">
          <Logo />
        </Link>
        <div className="flex w-full md:max-w-[550px] 3xl:max-w-[700px]">
          <DesktopSearch />
          <div className="ml-auto flex items-center lg:ml-2">
            <MobileSearch />
            <User />
            <CartDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}
