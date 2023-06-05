import useEnrichedLineItems from '@lib/hooks/use-enrich-line-items';
import DiscountCode from '@modules/checkout/components/discount-code';
import OrderSummary from '@modules/common/components/order-summary';
import SkeletonCartPage from '@modules/skeletons/templates/skeleton-cart-page';
import Heading from '@modules/ui/heading';
import Text from '@modules/ui/text';
import { useCart, useMeCustomer } from 'medusa-react';
import EmptyCartMessage from '../components/empty-cart-message';
import ItemsTemplate from './items';
import Container from '@modules/layout/components/container';

const CartTemplate = () => {
  const { cart, totalItems } = useCart();
  const { isLoading } = useMeCustomer();
  const items = useEnrichedLineItems();

  if (!cart || !cart?.id?.length || isLoading) {
    return <SkeletonCartPage />;
  }

  return (
    <Container>
      <div className="mb-6 flex items-center gap-1">
        <Heading size="md">Giỏ Hàng</Heading>
        <Text variant="dark" size="lg" span>
          ({totalItems} sản phẩm)
        </Text>
      </div>

      {cart.items.length ? (
        <div className="grid grid-cols-1 gap-x-12 small:grid-cols-[1fr_380px]">
          <ItemsTemplate region={cart?.region} items={items} />
          <div className="relative">
            <div className="sticky top-12 mt-6 flex flex-col gap-y-6 lg:mt-0">
              {cart && cart.region && (
                <>
                  <OrderSummary cart={cart} />
                  <DiscountCode cart={cart} />
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </Container>
  );
};

export default CartTemplate;
