import Menu from '@modules/common/icons/menu';
import { Sheet, SheetContent, SheetTrigger } from '@modules/ui/sheet';
import { FC } from 'react';
import MainMenu from '../components/main-menu';

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent>
        <MainMenu />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
