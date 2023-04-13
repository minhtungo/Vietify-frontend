import useToggleState from '@lib/hooks/use-toggle-state';
import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';
import Modal from '@modules/common/components/modal';
import Search from '@modules/common/icons/search';
import DesktopHit from '@modules/search/components/desktop-hit';
import DesktopHits from '@modules/search/components/desktop-hits';
import SearchBox from '@modules/search/components/search-box';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const DesktopSearchModal = () => {
  return (
    <>
      <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
        <div className="flex flex-col relative">
          <div className="w-full min-w-[550px] flex items-center gap-x-2 ">
            <SearchBox />
          </div>

          <div className="overflow-y-auto  no-scrollbar mt-6 absolute top-[60%] bg-white shadow-md">
            <DesktopHits hitComponent={DesktopHit} />
          </div>
        </div>
      </InstantSearch>
    </>
  );
};

export default DesktopSearchModal;
