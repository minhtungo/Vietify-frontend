import Counter from '@common/counter';
import SocialShare from '@common/social-share';
import HeartIcon from '@icons/heart';
import { useProductActions } from '@lib/context/product-context';
import useProductPrice from '@lib/hooks/use-product-price';
import cn from '@lib/util/cn';
import OptionSelect from '@modules/products/components/option-select';
import ReviewRating from '@modules/review/components/review-rating';
import { Separator } from '@modules/ui/separator';
import { Skeleton } from '@modules/ui/skeleton';
import Button from '@ui/button';
import Heading from '@ui/heading';
import Text from '@ui/text';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import toast from 'react-hot-toast';
import { Product } from 'types/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';

import { book } from '@static/book';
import AddedItem from './added-item';

type ProductActionsProps = {
  product: PricedProduct;
};

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
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

  const price = useProductPrice({ id: product.id!, variantId: variant?.id });

  const selectedPrice = useMemo(() => {
    const { variantPrice, cheapestPrice } = price;

    return variantPrice || cheapestPrice || null;
  }, [price]);

  const addItemToCart = () => {
    addToCart();
    const item = {
      thumbnail: product.thumbnail,
      title: product.title,
      quantity,
      unit_price: selectedPrice?.calculated_price,
    };
    toast((t) => <AddedItem item={item} t={t} />, {
      duration: 1600,
    });
    resetQuantity();
  };

  return (
    <div className="flex flex-col gap-y-2">
      {/* {product.collection && (
        <Link href={`/collections/${product.collection.id}`}>
          {product.collection.title}
        </Link>
      )} */}
      <Heading variant="large">{product?.title}</Heading>
      <div className="mt-1 flex w-full flex-wrap justify-between">
        <span className="w-1/2">
          <Text variant="info" className="font-semibold" as="span">
            {`${book.author}: `}
          </Text>
          <Text variant="info" as="span">
            Nguyễn Nhật Ánh
          </Text>
        </span>
        <span className="">
          <Text variant="info" className="font-semibold" as="span">
            {`${book.publisher}: `}
          </Text>
          <Text variant="info" as="span">
            Nguyễn Nhật Ánh
          </Text>
        </span>
        <span>
          <Text variant="info" className="font-semibold" as="span">
            {`${book.sku}: `}
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

      <div>
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
          <Skeleton className="h-9 w-16" />
        )}
      </div>

      {product?.variants.length > 1 && (
        <div className="flex flex-col gap-y-4">
          {(product.options || []).map((option) => {
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

      <Counter
        value={quantity}
        onIncrement={increaseQuantity}
        onDecrement={decreaseQuantity}
        disabled={!inStock}
        className="mt-4 w-fit"
      />

      <div className="mt-4 flex gap-3">
        <Button onClick={addItemToCart} className="w-full">
          {!inStock ? book.outOfStock : book.addToCart}
        </Button>
        <Button variant="outline" className="gap-1">
          <HeartIcon size={18} /> Wishlist
        </Button>
      </div>

      <Separator className="mb-2 mt-4" />
      <div>
        <Text variant="label" className="text-sm">
          Share
        </Text>
        <SocialShare
          shareUrl="vietify.shop"
          className="mt-2.5 flex flex-row gap-2"
        />
      </div>
    </div>
  );
};

export default ProductActions;
