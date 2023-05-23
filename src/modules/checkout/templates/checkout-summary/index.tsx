import DiscountCode from '@modules/checkout/components/discount-code';
import GiftCard from '@modules/checkout/components/gift-card';
import OrderDetails from '@modules/common/components/order-details';
import OrderSummary from '@modules/common/components/order-summary';
import { useCart } from 'medusa-react';

const CheckoutSummary = () => {
  const { cart } = useCart();

  if (!cart?.id) {
    return null;
  }

  return (
    <div className="sticky top-0 flex flex-col-reverse gap-y-6 small:flex-col">
      <OrderSummary cart={cart} />
      <OrderDetails cart={cart} />
      <DiscountCode cart={cart} />
      <GiftCard cart={cart} />
    </div>
  );
};

export default CheckoutSummary;
