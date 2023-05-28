import { StoreGetProductsParams } from '@medusajs/medusa';
import { Accordion } from '@modules/ui/accordion';

import { FC } from 'react';
import CategoriesFilter from './categories';
import PriceFilter from './price';

export interface FilterProps {
  handleCategoryChange: (checked: boolean, id: string) => void;
  refinementList: StoreGetProductsParams;
}

const Filter: FC<FilterProps> = ({ handleCategoryChange, refinementList }) => {
  return (
    <form className="hidden lg:block">
      <Accordion type="multiple">
        <CategoriesFilter
          handleCategoryChange={handleCategoryChange}
          refinementList={refinementList}
        />
        <PriceFilter defaultValue={[0, 100]} />
      </Accordion>
    </form>
  );
};

export default Filter;
