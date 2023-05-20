import HeartIcon from '@icons/heart';
import ProductQuickView from '@modules/products/components/product-quickview';
import Thumbnail from '@modules/products/components/thumbnail';
import ReviewRating from '@modules/review/components/review-rating';
import Button from '@modules/ui/button';
import Heading from '@modules/ui/heading';
import { Skeleton } from '@modules/ui/skeleton';
import Text from '@modules/ui/text';
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
    <div>
      <div className="group relative">
        <Link href={`/products/${handle}`}>
          <Thumbnail
            thumbnail={thumbnail}
            size="full"
            rounded="md"
            alt={`${title} photo`}
          />
        </Link>

        <div className="absolute bottom-3 right-2 flex flex-col gap-1 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full bg-secondary p-0 text-foreground/80 duration-150 hover:bg-primary hover:text-primary-foreground"
          >
            <HeartIcon />
          </Button>
          <ProductQuickView {...product} />
        </div>
      </div>
      <div className="text-base-regular mt-2 transition-colors duration-150">
        <Link href={`/products/${handle}`}>
          <Heading variant="sm" className="hover:text-primary">
            {title}
          </Heading>
        </Link>

        <ReviewRating className="mt-2" />
        <div className="mt-2 text-xs font-light text-gray-700 small:text-[13px]">
          Author
        </div>
        <div className="mt-2 flex items-center gap-x-2 text-base">
          {price ? (
            <>
              {price.price_type === 'sale' && (
                <span className="text-gray-500 line-through">
                  {price.original_price}
                </span>
              )}
              <Text variant="label" as="span" className="text-brand">
                {price.calculated_price}
              </Text>
            </>
          ) : (
            <Skeleton className="h-6 w-20" />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPreview;
