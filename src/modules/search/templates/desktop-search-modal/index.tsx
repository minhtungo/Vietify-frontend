import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';
import DesktopHit from '@modules/search/components/desktop-hit';
import DesktopHits from '@modules/search/components/desktop-hits';
import SearchBox from '@modules/search/components/search-box';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const DesktopSearchModal = () => {
  return (
    <>
      <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
        <div className="relative flex flex-col">
          <div className="w-full min-w-[500px] ">
            <SearchBox />
          </div>
          <DesktopHits hitComponent={DesktopHit} />
        </div>
      </InstantSearch>
    </>
  );
};

export default DesktopSearchModal;
