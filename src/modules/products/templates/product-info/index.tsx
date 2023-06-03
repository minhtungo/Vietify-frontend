import ProductActions from '@modules/products/components/product-actions';
import { Toaster } from 'react-hot-toast';
import { Product } from 'types/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import cn from '@lib/util/cn';

type ProductInfoProps = {
  product: PricedProduct;
  className?: string;
  ref: any;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  className,
  ref,
}) => {
  return (
    <div className={cn(className)} ref={ref}>
      <ProductActions product={product} />
    </div>
  );
};

export default ProductInfo;
