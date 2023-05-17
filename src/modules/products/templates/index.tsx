import { ProductProvider } from '@lib/context/product-context';
import { useIntersection } from '@lib/hooks/use-in-view';
import { Product } from '@medusajs/medusa';
import ProductTabs from '@modules/products/components/product-tabs';
import RelatedProducts from '@modules/products/components/related-products';
import ProductInfo from '@modules/products/templates/product-info';
import React, { useRef } from 'react';
import MobileActions from '../components/mobile-actions';
import ThumbnailCarousel from '../components/thumbnail-carousel';
import Breadcrumb from '@common/breadcrumb';

type ProductTemplateProps = {
  product: Product;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({ product }) => {
  const info = useRef<HTMLDivElement>(null);

  const inView = useIntersection(info, '0px');

  return (
    <ProductProvider product={product}>
      <div className="content-container pt-6">
        <Breadcrumb className="mb-5" />
        <div className="relative grid-cols-7 gap-2 lg:grid lg:gap-6">
          <div className="col-span-3 overflow-hidden md:mb-8 lg:mb-0">
            <ThumbnailCarousel
              gallery={[
                'https://demo2.pavothemes.com/bookory/wp-content/uploads/2022/02/26.jpg',
              ]}
            />
            {/* <ThumbnailCarousel gallery={product.images} /> */}
          </div>
          <div className="col-span-4" ref={info}>
            <ProductInfo product={product} />
          </div>
        </div>
        <div className="my-12">
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
