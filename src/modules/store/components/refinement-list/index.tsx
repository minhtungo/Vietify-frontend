import FunnelIcon from '@icons/funnel';
import MinusIcon from '@icons/minus';
import PlusIcon from '@icons/plus';
import { ProductCollection, StoreGetProductsParams } from '@medusajs/medusa';
import SortBy from '@modules/store/components/sort-by';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@ui/collapsible';
import { Separator } from '@ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { useCollections } from 'medusa-react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Filter from '../filter';

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
  const [isOpen, setIsOpen] = useState(false);

  const { collections, isLoading } = useCollections();

  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );

  const handleCollectionChange = (
    checked: boolean,
    collection: ProductCollection
  ) => {
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
    <main className="content-container">
      <div className="flex items-baseline justify-end">
        <div className="flex items-center">
          <SortBy />
          {/* Mobile filter dialog */}
          <Sheet>
            <SheetTrigger
              asChild
              className="ml-4 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent position="right" size="lg">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="gap-4 py-4">
                <h3 className="sr-only">Categories</h3>
              </div>
              <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="space-y-2 py-6"
              >
                <CollapsibleTrigger asChild>
                  <div className="flow-root">
                    <div className="flex w-full items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                      <span className="font-medium text-gray-900">Genres</span>
                      {isOpen ? (
                        <MinusIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <PlusIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-3">
                  <ul className="flex flex-col gap-y-2">
                    {collections?.map((c) => (
                      <li key={c.id} className="flex items-center space-x-2">
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
                </CollapsibleContent>
              </Collapsible>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Separator className="my-4" />

      <section aria-labelledby="filter-products" className="pt-6">
        <h2 id="filter-products" className="sr-only">
          Genres
        </h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <Filter
            handleCollectionChange={handleCollectionChange}
            refinementList={refinementList}
          />
          <div className="lg:col-span-4">{children}</div>
        </div>
      </section>
    </main>
  );
};

export default RefinementList;
