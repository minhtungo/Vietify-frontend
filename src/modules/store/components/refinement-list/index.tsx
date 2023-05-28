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
import { useMemo } from 'react';
import Filter from '../filter';
import CategoriesFilter from '../filter/categories';
import PriceFilter from '../filter/price';
import MobileFilter from '../mobile-filter';

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
  const { product_categories: categories } = useProductCategories();
  const router = useRouter();

  const handleCategoryChange = (checked: boolean, id: string) => {
    const categoryIds = refinementList.category_id || [];
    const exists = categoryIds.includes(id);
    console.log(exists);

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
        category_id: categoryIds.filter((c) => c !== id),
      });

      return;
    }

    return;
  };

  return (
    <main className="content-container">
      <div className="flex items-baseline justify-end">
        <Sorting />
        {/* Mobile filter dialog */}
        <MobileFilter>
          <CategoriesFilter
            handleCategoryChange={handleCategoryChange}
            refinementList={refinementList}
          />
          <PriceFilter defaultValue={[0, 100]} />
        </MobileFilter>
      </div>
      <Separator className="mb-4 mt-3" />

      <section
        aria-labelledby="products"
        className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5"
      >
        <Filter
          handleCategoryChange={handleCategoryChange}
          refinementList={refinementList}
        />
        <div className="lg:col-span-4">{children}</div>
      </section>
    </main>
  );
};

export default RefinementList;
