import clsx from 'clsx';
import Link from 'next/link';
import { ProductPreviewType } from 'types/global';
import Thumbnail from '../thumbnail';
import { HiOutlineStar, HiOutlineHeart, HiOutlineEye } from 'react-icons/hi2';

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
}: ProductPreviewType) => {
  return (
    <Link href={`/products/${handle}`}>
      <div>
        <div className="relative group">
          <Thumbnail thumbnail={thumbnail} size="full" rounded="lg" />
          <div className="absolute bottom-3 right-2 opacity-0 transition-all group-hover:opacity-100 duration-200 flex flex-col gap-1">
            <span className=" bg-white text-gray-800 p-2 rounded-full flex items-center shadow transition-all  duration-100 hover:bg-blue-500 hover:text-white">
              <HiOutlineHeart />
            </span>
            <span className="bg-white text-gray-800 p-2 rounded-full flex items-center hover:bg-blue-500 hover:text-white">
              <HiOutlineEye />
            </span>
          </div>
        </div>
        <div className="text-base-regular mt-2">
          <div className="font-semibold text-[15px]">{title}</div>
          <div className="flex items-center mt-2">
            <HiOutlineStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <HiOutlineStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <HiOutlineStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <HiOutlineStar className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <HiOutlineStar className="w-4 h-4 text-yellow-500 " />

            <p className="ml-2 text-xs font-medium text-gray-800 dark:text-gray-400">
              10
            </p>
          </div>
          <div className="font-light text-gray-700 text-xs small:text-[13px] mt-2">
            Author
          </div>
          <div className="flex items-center gap-x-2 mt-2 text-base">
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
