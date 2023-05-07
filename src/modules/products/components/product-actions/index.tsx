import Counter from '@common/counter';
import SocialShare from '@common/social-share';
import HeartIcon from '@icons/heart';
import ShareIcon from '@icons/share';
import { useProductActions } from '@lib/context/product-context';
import useProductPrice from '@lib/hooks/use-product-price';
import cn from '@lib/util/cn';
import OptionSelect from '@modules/products/components/option-select';
import ReviewRating from '@modules/review/components/review-rating';
import Button from '@ui/button';
import Heading from '@ui/heading';
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover';
import Text from '@ui/text';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Product } from 'types/medusa';
import AddedItem from './added-item';

type ProductActionsProps = {
  product: Product;
};

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const [shareButtonStatus, setShareButtonStatus] = useState<boolean>(false);

  const router = useRouter();
  const {
    query: { slug },
  } = router;

  const {
    updateOptions,
    addToCart,
    options,
    inStock,
    variant,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    resetQuantity,
  } = useProductActions();

  const price = useProductPrice({ id: product.id, variantId: variant?.id });

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price;

    return variantPrice || cheapestPrice || null;
  }, [price]);

  const addItemToCart = () => {
    addToCart();
    toast(
      (t) => (
        <AddedItem
          item={product}
          price={selectedPrice?.calculated_price}
          quantity={quantity}
          t={t}
        />
      ),
      {
        duration: 1600,
      }
    );
    resetQuantity();
  };

  return (
    <div className="flex flex-col gap-y-2">
      {/* {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          {product.collection.title}
        </Link>
      )} */}
      <Heading variant="large">{product.title}</Heading>
      <div className="mt-1 flex w-full flex-wrap justify-between">
        <span className="w-1/2">
          <Text variant="info" className="font-semibold" as="span">
            Author:{' '}
          </Text>
          <Text variant="info" as="span">
            Nguyễn Nhật Ánh
          </Text>
        </span>
        <span className="">
          <Text variant="info" className="font-semibold" as="span">
            Publisher:{' '}
          </Text>
          <Text variant="info" as="span">
            Nguyễn Nhật Ánh
          </Text>
        </span>
        <span>
          <Text variant="info" className="font-semibold" as="span">
            SKU:{' '}
          </Text>
          <Text variant="info" as="span">
            123456789
          </Text>
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <ReviewRating className="" />
        <span className="text-xs text-muted-foreground">{'(25 reviews)'}</span>
      </div>

      <div className="mb-4 flex gap-2">
        {selectedPrice ? (
          <div className="flex items-center gap-2 text-brand">
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
                <span className="text-rose-600">
                  -{selectedPrice.percentage_diff}%
                </span>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>

      {product.variants.length > 1 && (
        <div className="flex flex-col gap-y-4">
          {product.options.map((option) => {
            return (
              <div key={option.id}>
                <OptionSelect
                  option={option}
                  current={options[option.id]}
                  updateOption={updateOptions}
                  title={option.title}
                />
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <Counter
          value={quantity}
          onIncrement={increaseQuantity}
          onDecrement={decreaseQuantity}
          disabled={!inStock}
        />
        <Button onClick={addItemToCart} className="w-full">
          {!inStock ? 'Out of stock' : 'Add to cart'}
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <Button variant="outline" className="gap-1">
          <HeartIcon size={18} /> Wishlist
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full gap-1">
              <ShareIcon size={18} />
              Share
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[245px] px-4 py-4">
            <SocialShare className={cn('')} shareUrl={`https://google.com`} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default ProductActions;
