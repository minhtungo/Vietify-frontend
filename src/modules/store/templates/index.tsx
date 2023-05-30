import cn from '@lib/util/cn';
import getNumberOfSkeletons from '@lib/util/get-number-of-skeletons';
import repeat from '@lib/util/repeat';
import ProductPreview from '@modules/products/components/product-preview';
import SkeletonProductPreview from '@modules/skeletons/components/skeleton-product-preview';
import { FC } from 'react';
import { ProductPreviewType } from 'types/global';

interface productsTemplateProps {
  products: ProductPreviewType[];
  isLoading: boolean;
  isFetchingNextPage?: boolean;
  className?: string;
  pages?: any;
}

const ProductsTemplate: FC<productsTemplateProps> = ({
  products,
  isLoading,
  className,
  isFetchingNextPage,
  pages,
}) => {
  return (
    <div className={cn(className)}>
      <ul className="grid flex-1 grid-cols-2 gap-x-3 gap-y-4 small:grid-cols-3 medium:grid-cols-4">
        {products.map((p) => (
          <li key={p.id}>
            <ProductPreview {...p} />
          </li>
        ))}
        {isLoading &&
          !products.length &&
          repeat(8).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
        {isFetchingNextPage &&
          repeat(getNumberOfSkeletons(pages)).map((index) => (
            <li key={index}>
              <SkeletonProductPreview />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsTemplate;
