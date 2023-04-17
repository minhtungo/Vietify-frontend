import { ProductProvider } from '@lib/context/product-context';
import { useIntersection } from '@lib/hooks/use-in-view';
import { Product } from '@medusajs/medusa';
import ProductTabs from '@modules/products/components/product-tabs';
import RelatedProducts from '@modules/products/components/related-products';
import ProductInfo from '@modules/products/templates/product-info';
import React, { useRef } from 'react';
import ImageGallery from '../components/image-gallary';
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
        <div className="grid-cols-10 lg:grid gap-7 2xl:gap-8 relative">
          <div className="col-span-5 overflow-hidden xl:col-span-6 md:mb-8 lg:mb-0">
            {/* <ImageGallery images={product.images} /> */}
            <ThumbnailCarousel gallery={product.images} />
          </div>
          <div
            className="flex flex-col col-span-5 shrink-0 xl:col-span-4 xl:pl-2 gap-y-10"
            ref={info}
          >
            <ProductInfo product={product} />
            <ProductTabs product={product} />
          </div>
        </div>
        <div className="content-container my-16 px-6 small:px-8 small:my-32">
          <RelatedProducts product={product} />
        </div>
        <MobileActions product={product} show={!inView} />
      </div>
    </ProductProvider>
  );
};

export default ProductTemplate;
