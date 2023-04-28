import useTruncatedElement from '@lib/hooks/use-truncated-element';
import cn from '@lib/util/cn';
import { Product } from '@medusajs/medusa';
import Button from '@modules/common/components/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@modules/ui/tabs';
import Text from '@modules/ui/text';
import Back from '@modules/common/icons/back';
import FastDelivery from '@modules/common/icons/fast-delivery';
import Refresh from '@modules/common/icons/refresh';
import { useMemo, useRef } from 'react';

type ProductTabsProps = {
  product: Product;
};

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = useMemo(() => {
    return [
      {
        label: 'Product Information',
        component: <ProductInfoTab product={product} />,
      },
      {
        label: 'Shipping & Returns',
        component: <ShippingInfoTab />,
      },
    ];
  }, [product]);

  return (
    <Tabs defaultValue="Product Information">
      <TabsList className="box-border grid grid-cols-2 border-b border-gray-200">
        {tabs.map((tab, i) => {
          return (
            <TabsTrigger
              key={i}
              value={tab.label}
              className={cn(
                'text-small-regular transition-color -mb-px border-b border-gray-200 pb-2 text-left uppercase duration-150 ease-in-out'
              )}
            >
              {tab.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {tabs.map((tab, i) => {
        return (
          <TabsContent value={tab.label} key={i}>
            {tab.component}
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  const ref = useRef(null);
  const { isTruncated, isShowingMore, toggleIsShowingMore } =
    useTruncatedElement({
      ref,
    });

  return (
    <TabsContent
      value="Product Information"
      className="text-medium-regular py-8"
    >
      <div className="grid grid-cols-2 gap-x-8 border-b pb-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Material</span>
            <p>{product.material ? product.material : '-'}</p>
          </div>
          <div>
            <span className="font-semibold">Country of origin</span>
            <p>{product.origin_country ? product.origin_country : '-'}</p>
          </div>
          <div>
            <span className="font-semibold">Type</span>
            <p>{product.type ? product.type.value : '-'}</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="font-semibold">Weight</span>
            <p>{product.weight ? `${product.weight} g` : '-'}</p>
          </div>
          <div>
            <span className="font-semibold">Dimensions</span>
            <p>
              {product.length && product.width && product.height
                ? `${product.length}L x ${product.width}W x ${product.height}H`
                : '-'}
            </p>
          </div>
        </div>
      </div>
      <div className="py-4">
        <Text
          ref={ref}
          className={cn('break-words', !isShowingMore && 'line-clamp-3')}
        >
          {product.description}
          {product.description}
          {product.description}
          {product.description}
          {product.description}
        </Text>

        {isTruncated && (
          <Button
            className="mx-auto mt-4 block"
            variant="outline"
            onClick={toggleIsShowingMore}
          >
            {isShowingMore ? 'Show less' : 'Show more'}
          </Button>
        )}
      </div>
      {product.tags.length ? (
        <div>
          <span className="font-semibold">Tags</span>
        </div>
      ) : null}
    </TabsContent>
  );
};

const ShippingInfoTab = () => {
  return (
    <TabsContent value="Shipping & Returns" className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Fast delivery</span>
            <p className="max-w-sm">
              Your package will arrive in 3-5 business days at your pick up
              location or in the comfort of your home.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Simple exchanges</span>
            <p className="max-w-sm">
              Is the fit not quite right? No worries - we&apos;ll exchange your
              product for a new one.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Easy returns</span>
            <p className="max-w-sm">
              Just return your product and we&apos;ll refund your money. No
              questions asked – we&apos;ll do our best to make sure your return
              is hassle-free.
            </p>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default ProductTabs;
