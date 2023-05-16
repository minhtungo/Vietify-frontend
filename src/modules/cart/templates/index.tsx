import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import DiscountCode from '@modules/checkout/components/discount-code';
import SkeletonCartPage from '@modules/skeletons/templates/skeleton-cart-page';
import { useCart, useMeCustomer } from 'medusa-react';
import EmptyCartMessage from '../components/empty-cart-message';
import LogInPrompt from '../components/log-in-prompt';
import ItemsTemplate from './items';
import OrderSummary from '@modules/common/components/order-summary';

const CartTemplate = () => {
  const { cart } = useCart();
  const { customer, isLoading } = useMeCustomer();
  const items = useEnrichedLineItems();

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />;
  }

  return (
    <div className="content-container py-12">
      {cart.items.length ? (
        <>
          <div className="mb-4">{!customer && <LogInPrompt />}</div>
          <div className="grid grid-cols-1 gap-x-8 small:grid-cols-[1fr_360px]">
            <div className="flex flex-col gap-y-6 bg-white p-6">
              <ItemsTemplate region={cart?.region} items={items} />
            </div>
            <div className="relative">
              <div className="sticky top-12 flex flex-col gap-y-6">
                {cart && cart.region && (
                  <>
                    <OrderSummary cart={cart} />
                    <DiscountCode cart={cart} />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  );
};

export default CartTemplate;
