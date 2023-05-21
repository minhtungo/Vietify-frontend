import HeartIcon from '@icons/heart';
import ProductQuickView from '@modules/products/components/product-quickview';
import Thumbnail from '@modules/products/components/thumbnail';
import ReviewRating from '@modules/review/components/review-rating';
import Button from '@modules/ui/button';
import Heading from '@modules/ui/heading';
import { Skeleton } from '@modules/ui/skeleton';
import Text from '@modules/ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip';
import Link from 'next/link';
import { ProductPreviewType } from 'types/global';

const ProductPreview = ({
  title,
  handle,
  thumbnail,
  price,
  id,
}: ProductPreviewType) => {
  const product = {
    title,
    handle,
    thumbnail,
    price,
    id,
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="group relative">
          <Link href={`/products/${handle}`}>
            <Thumbnail
              thumbnail={thumbnail}
              size="full"
              rounded="md"
              alt={`${title} photo`}
            />
          </Link>

          <div className="absolute right-2 top-2/3 flex flex-col gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
            <Button
              variant="ghost"
              className="h-8 w-8 rounded-full bg-border p-0 text-foreground shadow-sm duration-150 hover:bg-primary hover:text-primary-foreground"
            >
              <HeartIcon size={18} />
            </Button>
            <ProductQuickView {...product} />
          </div>
          <Link href={`/products/${handle}`}>
            <Heading
              size="sm"
              className="mt-3 line-clamp-2 !text-[13px] hover:text-primary md:!text-sm"
            >
              {title}
            </Heading>
          </Link>
        </div>
      </TooltipTrigger>

      <div className="text-base-regular mt-2 transition-colors duration-150">
        <ReviewRating className="mt-2" />
        <div className="mt-2 text-xs font-light text-gray-700 small:text-[13px]">
          Author
        </div>
        <div className="mt-2 flex items-center gap-x-2 text-base">
          {price ? (
            <>
              {price.price_type === 'sale' && (
                <Text span className="line-through">
                  {price.original_price}
                </Text>
              )}
              <Text variant="brand" span>
                {price.calculated_price}
              </Text>
            </>
          ) : (
            <Skeleton className="h-6 w-20" />
          )}
        </div>
      </div>
      <TooltipContent>
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default ProductPreview;
