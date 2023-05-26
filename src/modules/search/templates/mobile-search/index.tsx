import { SEARCH_INDEX_NAME, searchClient } from '@lib/search-client';
import ArrowBack from '@modules/common/icons/arrow-back';
import Search from '@modules/common/icons/search';
import HitItem from '@modules/search/components/hit-item';

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
            <Search size={22} className="text-foreground/90" />
          </Button>
        </SheetTrigger>
        <SheetContent position="right" closeIcon={false}>
          <div className="flex w-full items-center gap-3">
            <SheetClose>
              <ArrowBack size={24} className="text-foreground/90" />
            </SheetClose>
            <div className="flex-1">
              <SearchBox />
            </div>
          </div>
          <MobileHits hitComponent={HitItem} className="mt-4" />
        </SheetContent>
      </Sheet>
    </InstantSearch>
  );
};

export default MobileSearch;
