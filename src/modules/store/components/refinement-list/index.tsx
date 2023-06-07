import { StoreGetProductsParams } from '@medusajs/medusa';
import Container from '@modules/layout/components/container';
import SortingList from '@modules/store/components/sorting-list';
import Heading from '@modules/ui/heading';
import { sorting } from '@static/sort-options';
import { Separator } from '@ui/separator';
import Filter from '../filter';
import CategoriesFilter from '../filter/categories';
import PriceFilter from '../filter/price';
import MobileFilter from '../mobile-filter';

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
  const handleCategoryChange = (checked: boolean, id: string) => {
    const categoryIds = refinementList.category_id || [];
    const exists = categoryIds.includes(id);

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
    <>
      <div className="flex items-center justify-between">
        <Heading size="md">Tất cả sản phẩm</Heading>
        <SortingList list={sorting} />
        <MobileFilter>
          <CategoriesFilter
            handleCategoryChange={handleCategoryChange}
            refinementList={refinementList}
          />
          <PriceFilter defaultValue={[0, 100]} />
        </MobileFilter>
      </div>

      <Separator className="mb-6 mt-3" />

      <section
        aria-labelledby="products"
        className="grid grid-cols-1 gap-x-8 lg:grid-cols-5"
      >
        <Filter
          handleCategoryChange={handleCategoryChange}
          refinementList={refinementList}
        />
        <div className="lg:col-span-4">{children}</div>
      </section>
    </>
  );
};

export default RefinementList;
