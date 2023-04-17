import { ProductProvider } from '@lib/context/product-context';
import { useIntersection } from '@lib/hooks/use-in-view';
import { Product } from '@medusajs/medusa';
import ProductTabs from '@modules/products/components/product-tabs';
import RelatedProducts from '@modules/products/components/related-products';
import ProductInfo from '@modules/products/templates/product-info';
import React, { useRef } from 'react';
import MobileActions from '../components/mobile-actions';
import ThumbnailCarousel from '../components/thumbnail-carousel';

type ProductTemplateProps = {
  product: Product;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null);

  const inView = useIntersection(info, '0px');

  return (
    <ProductProvider product={product}>
      <div className="content-container pt-6 pb-2 md:pt-7">
        <div className="grid-cols-11 lg:grid gap-7 2xl:gap-8 relative">
          <div className="col-span-5 overflow-hidden xl:col-span-5 md:mb-8 lg:mb-0">
            <ThumbnailCarousel gallery={product.images} />
          </div>
          <div
            className="flex flex-col col-span-5 shrink-0 xl:col-span-6 xl:pl-2 gap-y-10"
            ref={info}
          >
            <ProductInfo product={product} />
          </div>
        </div>
        <div className="my-16">
          <ProductTabs product={product} />
        </div>

        <div className="my-16">
          <RelatedProducts product={product} />
        </div>
        <MobileActions product={product} show={!inView} />
      </div>
    </ProductProvider>
  );
};

export default ProductTemplate;
