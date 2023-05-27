import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';

import SearchBox from '@modules/search/components/search-box';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const DesktopSearch = () => {
  return (
    <InstantSearch indexName={SEARCH_INDEX_NAME} searchClient={searchClient}>
      <SearchBox />
    </InstantSearch>
  );
};

export default DesktopSearch;
