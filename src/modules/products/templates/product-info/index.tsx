import ProductActions from '@modules/products/components/product-actions';
import { Product } from 'types/medusa';
import { Toaster } from 'react-hot-toast';
import cn from '@lib/util/cn';

type ProductInfoProps = {
  product: Product;
};

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <>
      <div className="mx-auto flex flex-col gap-y-12 lg:max-w-[500px]">
        <ProductActions product={product} />
      </div>
      <Toaster position="top-right" />
    </>
  );
};

export default ProductInfo;
