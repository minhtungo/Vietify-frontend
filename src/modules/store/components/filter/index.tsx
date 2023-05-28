import { ProductCategory, StoreGetProductsParams } from '@medusajs/medusa';
import { Accordion } from '@modules/ui/accordion';

import { useProductCategories } from 'medusa-react';
import { FC } from 'react';
import CategoriesFilter from './categories';
import PriceFilter from './price';

export interface FilterProps {
  handleCollectionChange: (
    checked: boolean,
    collection: ProductCategory
  ) => void;
  refinementList: StoreGetProductsParams;
}

const Filter: FC<FilterProps> = ({
  handleCollectionChange,
  refinementList,
}) => {
  const { product_categories: categories } = useProductCategories();

  return (
    <form className="hidden lg:block">
      <Accordion type="multiple">
        <CategoriesFilter
          categories={categories}
          handleCollectionChange={handleCollectionChange}
          refinementList={refinementList}
        />
        <PriceFilter defaultValue={[0, 100]} />
      </Accordion>
    </form>
  );
};

export default Filter;
