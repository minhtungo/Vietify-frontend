import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@modules/ui/accordion';
import { FC, useMemo } from 'react';

import DescriptionTab from '@modules/products/components/product-info/description';
import ProductDetails from '@modules/products/components/product-info/product-details';
import ReviewsTab from '@modules/products/components/product-info/reviews';
import { book } from '@static/book';

interface productAccordionProps {
  product: PricedProduct;
  className?: string;
}

const ProductAccordion: FC<productAccordionProps> = ({
  product,
  className,
}) => {
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
    <Accordion type="single" collapsible className={className}>
      {tabs.map(({ label, component }) => {
        return (
          <AccordionItem value={label} key={`${label}-accordion`}>
            <AccordionTrigger>{label}</AccordionTrigger>
            <AccordionContent>{component}</AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ProductAccordion;
