import clsx from 'clsx';
import Link from 'next/link';
import { ProductPreviewType } from 'types/global';
import Thumbnail from '../thumbnail';

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${handle}`}>
      <div>
        <Thumbnail thumbnail={thumbnail} size="full" rounded="lg" />
        <div className="text-base-regular mt-2">
          <div className="font-semibold text-[15px]">{title}</div>
          <span className="font-light text-gray-700 text-xs small:text-sm">
            Author
          </span>
          <div className="flex items-center gap-x-2 mt-1 text-base">
            {price ? (
              <>
                {price.price_type === 'sale' && (
                  <span className="line-through text-gray-500">
                    {price.original_price}
                  </span>
                )}
                <span
                  className={clsx('font-medium', {
                    'text-rose-500': price.price_type === 'sale',
                  })}
                >
                  {price.calculated_price}
                </span>
              </>
            ) : (
              <div className="w-20 h-6 animate-pulse bg-gray-100"></div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductPreview;
