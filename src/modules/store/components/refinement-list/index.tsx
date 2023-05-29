import { StoreGetProductsParams } from '@medusajs/medusa';
import SortingList from '@modules/store/components/sorting-list';
import Heading from '@modules/ui/heading';
import { Separator } from '@ui/separator';
import { useProductCategories } from 'medusa-react';
import { useRouter } from 'next/router';
import Filter from '../filter';
import CategoriesFilter from '../filter/categories';
import PriceFilter from '../filter/price';
import MobileFilter from '../mobile-filter';
import { sorting } from '@static/sort-options';

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
  const { c: categoryQuery } = router.query;

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
    <main className="content-container py-6">
      <div className="flex items-baseline justify-between">
        <Heading>Tất cả sản phẩm</Heading>
        <SortingList list={sorting}/>
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
