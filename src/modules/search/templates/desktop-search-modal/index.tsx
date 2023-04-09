import useToggleState from '@lib/hooks/use-toggle-state';
import { searchClient, SEARCH_INDEX_NAME } from '@lib/search-client';
import Modal from '@modules/common/components/modal';
import Search from '@modules/common/icons/search';
import DesktopHit from '@modules/search/components/desktop-hit';
import DesktopHits from '@modules/search/components/desktop-hits';
import SearchBox from '@modules/search/components/search-box';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const DesktopSearchModal = () => {
  const { state, close, open } = useToggleState();

  return (
    <>
      {/* <button onClick={open} className="flex items-center gap-x-2 h-full">
        <Search />
        Search
      </button> */}
      {/* <div
        onClick={open}
        className="w-full cursor-pointer rounded-full border border-gray-900/50 py-2 shadow-sm transition hover:shadow-md md:max-w-[600px] px-4"
      >
        <div className="flex flex-row items-center justify-between">
          <input
            className="w-full px-4 text-sm focus:outline-none bg-transparent placeholder:text-gray-900"
            placeholder="Search..."
          />
          <BiSearch size={20} className="text-gray-900" />
        </div>
      </div> */}
      <div
        className="text-gray-400 hover:text-gray-500 cursor-pointer"
        onClick={open}
      >
        <span className="sr-only">Search</span>
        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
      </div>

      <Modal isOpen={state} close={close} size="large">
        <Modal.Body>
          <InstantSearch
            indexName={SEARCH_INDEX_NAME}
            searchClient={searchClient}
          >
            <div className="flex flex-col h-full">
              <div className="w-full flex items-center gap-x-2 bg-transparent p-4">
                <Search />
                <SearchBox />
              </div>

              <div className="overflow-y-scroll flex-1 no-scrollbar mt-6">
                <DesktopHits hitComponent={DesktopHit} />
              </div>
            </div>
          </InstantSearch>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DesktopSearchModal;
