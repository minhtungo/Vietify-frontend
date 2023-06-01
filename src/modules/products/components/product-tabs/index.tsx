import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useMemo } from 'react';

import { book } from '@static/book';
import DescriptionTab from '../product-info/description';
import ProductDetails from '../product-info/product-details';
import ReviewsTab from '../product-info/reviews';

import cn from '@lib/util/cn';
type ProductTabsProps = {
  product: PricedProduct;
  className?: string;
};

const ProductTabs = ({ product, className }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: book.description,
        component: <DescriptionTab product={product} />,
      },
      {
        label: book.details,
        component: <ProductDetails product={product} />,
      },
      {
        label: book.review,
        component: <ReviewsTab product={product} />,
      },
    ];
  }, [product]);

  return (
    <Tabs defaultValue={book.description} className={cn(className)}>
      <TabsList className="gap-x-7">
        {tabs.map((tab, i) => {
          return (
            <TabsTrigger
              key={`${tab.label}-trigger`}
              value={tab.label}
              className="text-md px-0 hover:border-gray-400 hover:text-foreground/80"
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {tabs.map((tab, i) => {
        return (
          <TabsContent
            value={tab.label}
            key={`${tab.label}-tab`}
            className="pt-2"
          >
            {tab.component}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default ProductTabs;
