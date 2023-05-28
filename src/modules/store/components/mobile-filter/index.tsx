import { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { Accordion } from '@modules/ui/accordion';
import FunnelIcon from '@modules/common/icons/funnel';

interface mobileFilterProps {
  children: React.ReactNode;
}

const MobileFilter: FC<mobileFilterProps> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger className="ml-4 text-muted-foreground hover:text-foreground lg:hidden">
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </SheetTrigger>
      <SheetContent position="right">
        <SheetHeader>
          <SheetTitle>Bộ Lọc</SheetTitle>
          <h3 className="sr-only">Bộ Lọc</h3>
        </SheetHeader>
        <Accordion type="multiple" className="mt-4">
          {children}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilter;
