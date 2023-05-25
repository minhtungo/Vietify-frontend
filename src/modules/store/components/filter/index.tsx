import { ProductCollection, StoreGetProductsParams } from '@medusajs/medusa';
import PriceSelector from '@modules/common/components/price-selector';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/accordion';
import { Checkbox } from '@modules/ui/checkbox';
import { Label } from '@modules/ui/label';
import Text from '@modules/ui/text';

import { useProductCategories } from 'medusa-react';
import { ChangeEvent, FC } from 'react';

interface FilterProps {
  handleCollectionChange: (
    e: ChangeEvent<HTMLInputElement>,
    collection: ProductCollection
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
        <AccordionItem value="genre">
          <AccordionTrigger>
            <Text span variant="dark" size="md">
              Thể loại
            </Text>
          </AccordionTrigger>
          <AccordionContent asChild>
            <ul className="flex flex-col gap-y-2.5">
              {categories?.map((c) => (
                <li key={c.id}>
                  <Label
                    htmlFor={c.name}
                    className="flex items-center gap-x-2.5"
                  >
                    <Checkbox
                      id={c.name}
                      name={c.name}
                      value={c.name}
                      defaultChecked={refinementList.collection_id?.includes(
                        c.id
                      )}
                      onCheckedChange={(checked) =>
                        handleCollectionChange(checked, c)
                      }
                    />
                    <Text span size="md">
                      {c.name}
                    </Text>
                  </Label>
                  {/* <label className="flex items-center gap-x-2">
                    <input
                      type="checkbox"
                      defaultChecked={refinementList.collection_id?.includes(
                        c.id
                      )}
                      onChange={(e) => handleCollectionChange(e, c)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600">{c.name}</span>
                  </label> */}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <PriceSelector defaultValue={[0, 100]} />
    </form>
  );
};

export default Filter;
