import Counter from '@common/counter';
import SocialShare from '@common/social-share';
import HeartIcon from '@icons/heart';
import { useProductActions } from '@lib/context/product-context';
import useProductPrice from '@lib/hooks/use-product-price';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
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

import { book } from '@static/book';
import { ROUTES } from '@static/routes';
import AddedItem from './added-item';

type ProductActionsProps = {
  product: PricedProduct;
};

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const router = useRouter();
  const {
    query: { slug },
  } = router;
  const shareUrl = `${process.env.NEXT_PUBLIC_HOST_NAME}${ROUTES.PRODUCTS}/${slug}`;
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
    <div className="flex flex-col gap-y-1">
      <Heading size="md">{product?.title}</Heading>
      <div className="text-left">
        <div className="flex w-full justify-between">
          <div className="w-3/5">
            <Text size="sm" span>
              {`${book.author}: `}
            </Text>
            <Text className="font-semibold" size="sm" span>
              Nguyễn Nhật Ánh
            </Text>
          </div>
          <div className="w-2/5">
            <Text size="sm" span>
              Hình thức bìa:{' '}
            </Text>
            <Text className="font-semibold" size="sm" span>
              Bìa mềm
            </Text>
          </div>
        </div>
        <div className="flex w-full justify-between">
          <div className="w-3/5">
            <Text size="sm" span>
              {`${book.publisher}: `}
            </Text>
            <Text className="font-semibold" size="sm" span>
              Nguyễn Nhật Ánh
            </Text>
          </div>
          <div className="w-2/5">
            <Text size="sm" span>
              {`${book.sku}: `}
            </Text>
            <Text className="font-semibold" size="sm" span>
              123456789
            </Text>
          </div>
        </div>
      </div>

      <div className="mb-2 mt-1.5 flex items-center space-x-1">
        <ReviewRating />
        <Text span className="line-clamp-3 !text-xs">
          (25 reviews)
        </Text>
      </div>
      <Text size="md">{product.description}</Text>

      {selectedPrice ? (
        <div className="mt-2 flex items-center gap-2 text-primary">
          <Text variant="brand" span className="!text-2xl !font-semibold">
            {selectedPrice.calculated_price}
          </Text>
          {selectedPrice.price_type === 'sale' && (
            <>
              <Text span className="line-through">
                {selectedPrice.original_price}
              </Text>
              <Text span variant="brand">
                -{selectedPrice.percentage_diff}%
              </Text>
            </>
          )}
        </div>
      ) : (
        <Skeleton className="mt-2 h-9 w-16 " />
      )}

      {product?.variants.length > 1 && (
        <div className="mt-2 flex flex-col gap-y-4">
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

      <div className="mt-4 flex gap-3">
        <Counter
          value={quantity}
          onIncrement={increaseQuantity}
          onDecrement={decreaseQuantity}
          disabled={!inStock}
        />
        <Button onClick={addItemToCart} className="w-full">
          {!inStock ? book.outOfStock : book.addToCart}
        </Button>
        <Button variant="outline" className="gap-1">
          <HeartIcon size={18} />
          <span className="hidden md:inline">Wishlist</span>
        </Button>
      </div>

      <Separator className="my-4" />
      <div className="flex items-center gap-2">
        <Text variant="dark" className="font-semibold" size="md" span>
          Chia sẻ sản phẩm này:
        </Text>
        <SocialShare shareUrl={shareUrl} className="flex gap-2" />
      </div>
    </div>
  );
};

export default ProductActions;
