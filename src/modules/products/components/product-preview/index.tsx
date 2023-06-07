import Heart from '@icons/heart';
import ProductQuickView from '@modules/products/components/product-quickview';
import Thumbnail from '@modules/products/components/thumbnail';
import ReviewRating from '@modules/review/components/review-rating';
import Button from '@modules/ui/button';
import { Card, CardContent, CardHeader } from '@modules/ui/card';
import Heading from '@modules/ui/heading';
import { Skeleton } from '@modules/ui/skeleton';
import Text from '@modules/ui/text';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@ui/tooltip';
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
    <Card className="group relative">
      <CardHeader className="p-4 pb-2">
        <Link href={`/products/${handle}`}>
          <Thumbnail
            thumbnail={thumbnail}
            size="full"
            rounded="md"
            alt={`${title} photo`}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="absolute right-2 top-[48%] flex flex-col gap-2 opacity-0 transition-all duration-200 group-hover:opacity-100">
          <Button
            variant="ghost"
            className="h-8 w-8 rounded-full bg-brand/80 p-0 text-primary-foreground shadow-sm duration-150 hover:bg-primary hover:text-primary-foreground"
          >
            <Heart size={18} />
          </Button>
          <ProductQuickView {...product} />
        </div>
        <TooltipProvider delayDuration={350}>
          <Tooltip>
            <TooltipTrigger>
              <Link href={`/products/${handle}`}>
                <Heading className="mt-1 line-clamp-2 !text-sm hover:text-primary md:!text-[15px]">
                  {title}
                </Heading>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ReviewRating className="my-2" />
        <Text span size="sm">
          Author
        </Text>
        <div className="mt-2 flex items-center gap-x-2 text-base">
          {price ? (
            <>
              <Text
                variant={price.price_type === 'sale' ? 'brand' : 'dark'}
                span
                className="!font-semibold"
              >
                {price.calculated_price}
              </Text>
              {price.price_type === 'sale' && (
                <Text span variant="brand">
                  -{price.difference}%
                </Text>
              )}
            </>
          ) : (
            <Skeleton className="h-6 w-20" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductPreview;
