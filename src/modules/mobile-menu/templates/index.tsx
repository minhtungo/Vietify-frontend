import Logo from '@modules/common/components/logo';
import Menu from '@modules/common/icons/menu';
import { Sheet, SheetContent, SheetTrigger } from '@modules/ui/sheet';
import { FC } from 'react';
import MainMenu from '../components/main-menu';

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger className="block lg:hidden">
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="overflow-auto">
        <Logo className="absolute left-0 right-0 top-[22px] mx-auto" />
        <MainMenu />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
