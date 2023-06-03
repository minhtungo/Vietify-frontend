import Breadcrumb from '@common/breadcrumb';
import { ProductProvider } from '@lib/context/product-context';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import ProductTabs from '@modules/products/components/product-tabs';
import RelatedProducts from '@modules/products/components/related-products';
import ProductInfo from '@modules/products/templates/product-info';
import React, { useRef } from 'react';
import ProductAccordion from '../components/product-accordion';
import ThumbnailCarousel from '../components/thumbnail-carousel';

type ProductTemplateProps = {
  product: PricedProduct;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null);

  return (
    <ProductProvider product={product}>
      <div className="content-container px-6 pt-6 md:px-12 lg:px-6 xl:px-4">
        <Breadcrumb title={product.title!} />
        <div className="mt-6 grid-cols-7 gap-x-12 lg:grid">
          <div className="col-span-3 mb-6 overflow-hidden md:mb-8 lg:mb-0">
            <ThumbnailCarousel gallery={product.images} />
          </div>
          <ProductInfo product={product} className="col-span-4" ref={info} />
        </div>

        <ProductTabs product={product} className="my-12 hidden md:block" />
        <ProductAccordion product={product} className="my-12 block md:hidden" />
        <RelatedProducts product={product} className="my-16" />
      </div>
    </ProductProvider>
  );
};

export default ProductTemplate;

{
  /* <MobileActions product={product} show={!inView} /> */
}
// const inView = useIntersection(info, '0px');
