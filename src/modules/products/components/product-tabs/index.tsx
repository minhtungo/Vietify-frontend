import cn from '@lib/util/cn';
import { Product } from '@medusajs/medusa';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useMemo } from 'react';

import AdditionalInfoTab from './additional-info';
import DescriptionTab from './description-tab';
import ReviewsTab from './reviews';

type ProductTabsProps = {
  product: Product;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: 'Description',
        component: <DescriptionTab product={product} />,
      },
      {
        label: 'Additional Info',
        component: <AdditionalInfoTab product={product} />,
      },
      {
        label: 'Reviews',
        component: <ReviewsTab product={product} />,
      },
    ];
  }, [product]);

  return (
    <Tabs defaultValue="Description">
      <TabsList className="flex flex-col border-b border-gray-200 lg:flex-row">
        {tabs.map((tab, i) => {
          return (
            <TabsTrigger
              key={i}
              value={tab.label}
              className={cn(
                'transition-color w-[15%] uppercase duration-150 ease-in-out'
              )}
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabs.map((tab, i) => {
        return (
          <TabsContent value={tab.label} key={i}>
            {tab.component}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ProductTabs;
