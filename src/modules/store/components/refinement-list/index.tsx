import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ProductCollection, StoreGetProductsParams } from '@medusajs/medusa';
import Heading from '@ui/heading';
import Link from '@common/link';
import FunnelIcon from '@icons/funnel';
import MinusIcon from '@icons/minus';
import PlusIcon from '@icons/plus';
import XMarkIcon from '@icons/x';
import SortBy from '@modules/store/components/sort-by';
import { useCollections } from 'medusa-react';
import { useRouter } from 'next/router';
import { ChangeEvent, useMemo, Fragment, useState, useEffect } from 'react';

type RefinementListProps = {
  refinementList: StoreGetProductsParams;
  setRefinementList: (refinementList: StoreGetProductsParams) => void;
  children: React.ReactNode;
};

const checkIsActive = (arr: any, item: string) => {
  if (arr.includes(item)) {
    return true;
  }
  return false;
};

const RefinementList = ({
  refinementList,
  setRefinementList,
  children,
}: RefinementListProps) => {
  const [params, setParams] = useState<StoreGetProductsParams>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  console.log(params);

  const { collections, isLoading } = useCollections();

  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );

  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    collection: ProductCollection
  ) => {
    const { checked } = e.target;

    const { id, title } = collection;

    const collectionIds = refinementList.collection_id || [];

    const exists = collectionIds.includes(collection.id);

    const { category, ...restQuery } = query;

    let currentFormState = selectedCategories.includes(title)
      ? selectedCategories.filter((i) => i !== title)
      : [...selectedCategories, title];

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { category: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        collection_id: [...collectionIds, id],
      });

      return;
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        collection_id: collectionIds.filter((c) => c !== id),
      });

      return;
    }

    return;
  };

  return (
    <>
      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    {collections?.map((c) => (
                      <li key={c.id}>
                        <Link href="/" className="block px-2 py-3">
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {collections?.map((c) => (
                    <Disclosure
                      as="div"
                      key={c.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {c.title}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {collections.map((c) => (
                                <div key={c.id} className="flex items-center">
                                  <input
                                    id={`filter-mobile-${c.id}`}
                                    name={`${c.id}[]`}
                                    defaultValue={c.title}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${c.id}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {c.title}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="content-container">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6">
          <Heading size="lg">New Arrivals</Heading>

          <div className="flex items-center">
            <SortBy />
            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <Disclosure as="div" className="border-b border-gray-200 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          Genres
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <ul className="flex flex-col gap-x-4 gap-y-2">
                        {collections?.map((c) => (
                          <li key={c.id} className="">
                            <label className="flex items-center gap-x-2">
                              <input
                                type="checkbox"
                                defaultChecked={refinementList.collection_id?.includes(
                                  c.id
                                )}
                                onChange={(e) => handleCollectionChange(e, c)}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-sm text-gray-600">
                                {c.title}
                              </span>
                            </label>
                          </li>
                        ))}
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </form>

            {/* Product grid */}
            <div className="lg:col-span-3">{children}</div>
          </div>
        </section>
      </main>
    </>
  );
};

export default RefinementList;
