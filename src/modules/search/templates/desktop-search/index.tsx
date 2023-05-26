import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';
import DesktopHit from '@modules/search/components/desktop-hit';
import DesktopHits from '@modules/search/components/desktop-hits';
import SearchBox from '@modules/search/components/search-box';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const DesktopSearch = () => {
  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <div className="relative hidden w-full lg:block">
        <SearchBox />
        <DesktopHits hitComponent={DesktopHit} />
      </div>
    </InstantSearch>
  );
};

export default DesktopSearch;