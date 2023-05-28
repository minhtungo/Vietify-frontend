import FunnelIcon from '@icons/funnel';
import { ProductCategory, StoreGetProductsParams } from '@medusajs/medusa';
import Sorting from '@modules/store/components/sort-by';
import { Accordion } from '@modules/ui/accordion';
import { Separator } from '@ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@ui/sheet';
import { useProductCategories } from 'medusa-react';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import Filter from '../filter';
import CategoriesFilter from '../filter/categories';
import PriceFilter from '../filter/price';

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

  const { product_categories: categories } = useProductCategories();

  const router = useRouter();
  const { pathname, query } = router;
  const selectedCategories = useMemo(
    () => (query?.category ? (query.category as string).split(',') : []),
    [query?.category]
  );

  const handleCollectionChange = (
    checked: boolean,
    category: ProductCategory
  ) => {
    const { id, name } = category;

    const categoryIds = refinementList.category_id || [];

    const exists = categoryIds.includes(category.id);

    const { c, ...restQuery } = query;

    let currentFormState = selectedCategories.includes(name)
      ? selectedCategories.filter((i) => i !== name)
      : [...selectedCategories, name];

    router.push(
      {
        pathname,
        query: {
          ...restQuery,
          ...(!!currentFormState.length
            ? { c: currentFormState.join(',') }
            : {}),
        },
      },
      undefined,
      { scroll: false }
    );

    if (checked && !exists) {
      setRefinementList({
        ...refinementList,
        category_id: [...categoryIds, id],
      });

      return;
    }

    if (!checked && exists) {
      setRefinementList({
        ...refinementList,
        collection_id: categoryIds.filter((c) => c !== id),
      });

      return;
    }

    return;
  };

  return (
    <main className="content-container">
      <div className="flex items-baseline justify-end">
        <div className="flex items-center">
          <Sorting />
          {/* Mobile filter dialog */}
          <Sheet>
            <SheetTrigger className="ml-4 text-muted-foreground hover:text-foreground lg:hidden">
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </SheetTrigger>
            <SheetContent position="right">
              <SheetHeader>
                <SheetTitle>Bộ Lọc</SheetTitle>
                <h3 className="sr-only">Bộ Lọc</h3>
              </SheetHeader>
              <Accordion type="multiple" className="mt-4">
                <CategoriesFilter
                  categories={categories}
                  handleCollectionChange={handleCollectionChange}
                  refinementList={refinementList}
                />
                <PriceFilter defaultValue={[0, 100]} />
              </Accordion>
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
