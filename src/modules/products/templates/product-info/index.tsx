import ProductActions from '@modules/products/components/product-actions';
import { Toaster } from 'react-hot-toast';
import { Product } from 'types/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

type ProductInfoProps = {
  product: PricedProduct;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="mx-auto flex flex-col gap-y-12 lg:max-w-[500px]">
      <ProductActions product={product} />
    </div>
  );
};

export default ProductInfo;
