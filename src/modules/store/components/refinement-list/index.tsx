import { Dialog, Disclosure, Transition } from '@headlessui/react';
import { ProductCollection, StoreGetProductsParams } from '@medusajs/medusa';
import Heading from '@modules/common/components/heading';
import Link from '@modules/common/components/link';
import FunnelIcon from '@modules/common/icons/funnel';
import MinusIcon from '@modules/common/icons/minus';
import PlusIcon from '@modules/common/icons/plus';
import XMarkIcon from '@modules/common/icons/x';
import SortBy from '@modules/store/components/sort-by';
import { useCollections } from 'medusa-react';
import { useRouter } from 'next/router';
import { ChangeEvent } from 'react';
import { Fragment, useState } from 'react';

const subCategories = [
  { name: 'Totes', href: '#' },
  { name: 'Backpacks', href: '#' },
  { name: 'Travel Bags', href: '#' },
  { name: 'Hip Bags', href: '#' },
  { name: 'Laptop Sleeves', href: '#' },
];
const filters = [
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'New Arrivals', checked: false },
      { value: 'sale', label: 'Sale', checked: false },
      { value: 'travel', label: 'Travel', checked: true },
      { value: 'organization', label: 'Organization', checked: false },
      { value: 'accessories', label: 'Accessories', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
];

type RefinementListProps = {
  refinementList: StoreGetProductsParams;
  setRefinementList: (refinementList: StoreGetProductsParams) => void;
  children: React.ReactNode;
};

const RefinementList = ({
  refinementList,
  setRefinementList,
  children,
}: RefinementListProps) => {
  const [params, setParams] = useState<StoreGetProductsParams>({});
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { collections, isLoading } = useCollections();

  const router = useRouter();
  const { pathname, query } = router;
  const currentSelectedItem = query?.sort_by
    ? collections?.find((c) => c.title === query.sort_by)!
    : '';

  const handleCollectionChange = (
    e: ChangeEvent<HTMLInputElement>,
    collection: ProductCollection
  ) => {
    const { checked } = e.target;

    const { id, title } = collection;

    const collectionIds = refinementList.collection_id || [];

    const exists = collectionIds.includes(collection.id);

    const { sort_by, ...restQuery } = query;

    const newQuery = {
      ...restQuery,
    };
    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          sort_by: collectionIds,
          // ...(values.value !== options[0].value
          //   ? { sort_by: values.value }
          //   : {}),
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

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
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
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
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
                      <ul className="flex gap-x-4 flex-col gap-y-2">
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

{
  /* <h3 className="sr-only">Categories</h3>
              <ul
                role="list"
                className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
              >
                {subCategories.map((category) => (
                  <li key={category.name}>
                    <a href={category.href}>{category.name}</a>
                  </li>
                ))}
              </ul> */
}
