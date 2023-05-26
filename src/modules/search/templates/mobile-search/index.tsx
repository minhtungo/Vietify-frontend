import { SEARCH_INDEX_NAME, searchClient } from '@lib/search-client';
import SearchIcon from '@modules/common/icons/search';
import MobileHit from '@modules/search/components/mobile-hit';
import MobileHits from '@modules/search/components/mobile-hits';
import SearchBox from '@modules/search/components/search-box';
import Button from '@modules/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@modules/ui/sheet';
import { FC } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { InstantSearch } from 'react-instantsearch-hooks-web';

interface indexProps {}

const MobileSearch: FC<indexProps> = ({}) => {
  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button
            variant="ghost"
            className="h-9 w-9 items-center rounded-full p-0 duration-150"
          >
            <SearchIcon size={22} className="text-foreground/90" />
          </Button>
        </SheetTrigger>
        <SheetContent position="right" closeIcon={false}>
          <div className="flex w-full items-center gap-2">
            <SheetClose>
              <IoArrowBackOutline size={24} className="text-foreground/90" />
            </SheetClose>
            <div className="flex-1">
              <SearchBox />
            </div>
          </div>
          <MobileHits hitComponent={MobileHit} className="mt-4" />
        </SheetContent>
      </Sheet>
    </InstantSearch>
  );
};

export default MobileSearch;
