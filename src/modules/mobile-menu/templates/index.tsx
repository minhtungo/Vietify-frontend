import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Logo from '@modules/common/components/logo';
import Menu from '@modules/common/icons/menu';
import { Sheet, SheetContent, SheetTrigger } from '@modules/ui/sheet';
import { FC } from 'react';
import CategoryMenu from '../components/category-menu';
import MainMenu from '../components/main-menu';
import ArrowBack from '@modules/common/icons/arrow-back';

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  const {
    screen: [currentScreen, setScreen],
  } = useMobileMenu();
  return (
    <Sheet onOpenChange={() => setScreen('main')}>
      <SheetTrigger className="block lg:hidden">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        {currentScreen !== 'main' && (
          <button
            onClick={() => setScreen('main')}
            className="absolute left-5 top-5 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
          >
            <ArrowBack size={22} />
          </button>
        )}
        <Logo className="mx-auto" />

        {(() => {
          switch (currentScreen) {
            case 'categoryMenu':
              return <CategoryMenu />;
            default:
              return <MainMenu />;
          }
        })()}
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
