import Eye from '@icons/eye';
import Thumbnail from '@modules/products/components/thumbnail';
import Button, { buttonVariants } from '@ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@ui/dialog';
import Heading from '@ui/heading';
import Link from 'next/link';
import { ProductPreviewType } from 'types/global';

import cn from '@lib/util/cn';
import Counter from '@modules/common/components/counter';
import ReviewRating from '@modules/review/components/review-rating';
import Text from '@ui/text';

const ProductQuickView = ({
  title,
  handle,
  thumbnail,
  price: selectedPrice,
  id,
}: ProductPreviewType) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 rounded-full bg-brand/80 p-0 text-primary-foreground shadow-sm duration-150 hover:bg-primary hover:text-primary-foreground"
        >
          <Eye size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-2xl lg:max-w-3xl">
        <DialogHeader></DialogHeader>
        <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
          <div className="sm:col-span-4 lg:col-span-5">
            <Thumbnail
              thumbnail={thumbnail}
              size="full"
              rounded="md"
              alt={title}
            />
          </div>
          <div className="sm:col-span-8 lg:col-span-7">
            <Heading size="md">{title}</Heading>
            <div className="mt-1 flex w-full flex-wrap justify-between">
              <span className="w-1/2">
                <Text className="font-semibold" span>
                  Author:{' '}
                </Text>
                <Text span>Nguyễn Nhật Ánh</Text>
              </span>
              <span className="">
                <Text className="font-semibold" span>
                  Publisher:{' '}
                </Text>
                <Text span>Nguyễn Nhật Ánh</Text>
              </span>
              <span>
                <Text className="font-semibold" span>
                  SKU:{' '}
                </Text>
                <Text span>123456789</Text>
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <ReviewRating className="" />
              <span className="text-xs text-muted-foreground">
                {'(25 reviews)'}
              </span>
            </div>

            <div className="my-4 flex gap-2">
              {selectedPrice ? (
                <div className="flex items-center gap-2 text-primary">
                  <span
                    className={cn('text-xl-semi', {
                      'text-rose-600': selectedPrice.price_type === 'sale',
                    })}
                  >
                    {selectedPrice.calculated_price}
                  </span>
                  {selectedPrice.price_type === 'sale' && (
                    <>
                      <p>
                        <span className="text-gray-500">Original: </span>
                        <span className="line-through">
                          {selectedPrice.original_price}
                        </span>
                      </p>
                      {/* <span className="text-rose-600">
                        -{selectedPrice.percentage_diff}%
                      </span> */}
                    </>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <Text size="sm" className="line-clamp-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
              praesentium ipsum tempora, reprehenderit voluptatibus sunt unde.
              Officia aut quis impedit molestiae. Magni doloremque excepturi
              earum eum eius voluptatibus officia doloribus?
            </Text>
            <div className="mt-6 flex gap-3">
              <Counter
                value={1}
                // onIncrement={increaseQuantity}
                // onDecrement={decreaseQuantity}
                // disabled={!inStock}
              />
              <Button className="w-full">Add to cart</Button>
            </div>
            <Link
              className={cn(
                buttonVariants({
                  variant: 'outline',
                }),
                'mt-3 w-full'
              )}
              href={`/products/${handle}`}
            >
              View full details
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
