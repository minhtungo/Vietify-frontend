import { ProductCategory } from '@medusajs/medusa';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/accordion';
import { Checkbox } from '@modules/ui/checkbox';
import { Label } from '@modules/ui/label';
import Text from '@modules/ui/text';

import { FC } from 'react';
import { FilterProps } from '.';

interface categoriesProps extends FilterProps {
  categories: ProductCategory[] | undefined;
}

const CategoriesFilter: FC<categoriesProps> = ({
  categories,
  handleCollectionChange,
  refinementList,
}) => {
  return (
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
              <Label htmlFor={c.name} className="flex items-center gap-x-2.5">
                <Checkbox
                  id={c.name}
                  name={c.name}
                  value={c.name}
                  defaultChecked={refinementList.collection_id?.includes(c.id)}
                  onCheckedChange={(checked) =>
                    handleCollectionChange(checked as boolean, c)
                  }
                />
                <Text span size="md">
                  {c.name}
                </Text>
              </Label>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default CategoriesFilter;
