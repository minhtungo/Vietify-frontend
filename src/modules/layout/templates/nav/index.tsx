import Hamburger from '@common/hamburger';
import { useMobileMenu } from '@lib/context/mobile-menu-context';
import useScrollDirection from '@lib/hooks/use-scroll-direction';
import cn from '@lib/util/cn';
import Logo from '@modules/common/components/logo';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import User from '@modules/layout/components/user';
import MobileMenu from '@modules/mobile-menu/templates';
import DesktopSearchModal from '@modules/search/templates/desktop-search-modal';
import Link from 'next/link';
import HeaderList from './header-list';

export default function Nav() {
  // const { pathname } = useRouter();
  // const [isHome, setIsHome] = useState(false);

  // useEffect(() => {
  //   pathname === '/' ? setIsHome(true) : setIsHome(false);
  // }, [pathname]);

  const scrollDirection = useScrollDirection();

  const { toggle } = useMobileMenu();

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-300',
        scrollDirection === 'down' ? '-top-16' : 'top-0'
      )}
    >
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between gap-2 px-6 xl:px-4">
        <div className="flex h-full basis-0 items-center md:hidden">
          <MobileMenu />
        </div>
        <div className="flex items-center gap-7">
          <Link href="/" className="hidden md:block">
            <Logo />
          </Link>
          <HeaderList />
        </div>

        <div className="flex w-full items-center">
          <DesktopSearchModal />
          <div className="ml-2 hidden md:block">
            <User />
          </div>
          <CartDropdown className="ml-1" />
        </div>
      </div>
    </header>
  );
}
