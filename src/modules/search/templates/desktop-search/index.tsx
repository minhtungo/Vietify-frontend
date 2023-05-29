import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';

import SearchBox from '@modules/search/components/search-box';
import { InstantSearch, Configure } from 'react-instantsearch-hooks-web';

const DesktopSearch = () => {
  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <div className="ml-auto hidden w-full md:max-w-[350px] lg:block 2xl:max-w-[500px]">
        <Configure hitsPerPage={3} />
        <SearchBox />
      </div>
    </InstantSearch>
  );
};

export default DesktopSearch;
