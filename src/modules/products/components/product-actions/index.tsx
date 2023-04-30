import { useProductActions } from '@lib/context/product-context';
import useProductPrice from '@lib/hooks/use-product-price';
import cn from '@lib/util/cn';
import Button from '@ui/button';
import Counter from '@common/counter';
import Heading from '@ui/heading';
import SocialShare from '@common/social-share';
import HeartIcon from '@icons/heart';
import ShareIcon from '@icons/share';
import OptionSelect from '@modules/products/components/option-select';
import ReviewRating from '@modules/review/components/review-rating';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { Product } from 'types/medusa';
import toast from 'react-hot-toast';
import AddedItem from './added-item';
import Text from '@ui/text';

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
    toast.custom(
      (t) => (
        <div
          className={cn(
            'rounded bg-white p-3 shadow-md',
            t.visible ? 'animate-enter' : 'animate-leave'
          )}
        >
          <AddedItem
            item={product}
            price={selectedPrice?.calculated_price}
            quantity={quantity}
          />
        </div>
      ),
      {
        duration: 500,
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
      <div className="flex gap-2">
        <Text variant="info">
          <span className="text-brand-muted/80">Author:</span> Nguyễn Nhật Ánh
        </Text>
        <ReviewRating className="border-l pl-2" />
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
        <div className="group relative">
          <Button
            variant="outline"
            className="w-full gap-1"
            onClick={() => setShareButtonStatus(!shareButtonStatus)}
          >
            <ShareIcon size={18} />
            Share
          </Button>
          <SocialShare
            className={cn(
              'absolute right-0 z-10 w-[300px] transition-all duration-300',
              shareButtonStatus
                ? 'visible top-full opacity-100'
                : 'invisible top-[130%] opacity-0'
            )}
            shareUrl={`https://google.com`}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductActions;
