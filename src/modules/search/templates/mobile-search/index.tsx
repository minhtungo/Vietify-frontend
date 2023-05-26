import SearchIcon from '@modules/common/icons/search';
import Button from '@modules/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@modules/ui/sheet';
import { FC } from 'react';

interface indexProps {}

const MobileSearch: FC<indexProps> = ({}) => {
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button
          variant="ghost"
          className="h-9 w-9 items-center rounded-full p-0 duration-150"
        >
          <SearchIcon size={22} className="text-foreground/90" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSearch;
