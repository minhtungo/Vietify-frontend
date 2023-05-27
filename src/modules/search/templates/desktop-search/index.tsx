import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';

import SearchBox from '@modules/search/components/search-box';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const DesktopSearch = () => {
  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <div className="ml-auto hidden w-full md:max-w-[550px] lg:block 3xl:max-w-[700px]">
        <SearchBox />
      </div>
    </InstantSearch>
  );
};

export default DesktopSearch;
