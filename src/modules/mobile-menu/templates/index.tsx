import Menu from '@modules/common/icons/menu';
import { Sheet, SheetContent, SheetTrigger } from '@modules/ui/sheet';
import { FC } from 'react';
import MainMenu from '../components/main-menu';
import Logo from '@modules/common/components/logo';
import { Separator } from '@modules/ui/separator';

interface MobileMenuProps {}

const MobileMenu: FC<MobileMenuProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent>
        <Logo className="mx-auto" />
        <MainMenu />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
