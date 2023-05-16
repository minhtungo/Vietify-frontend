import Addresses from '@modules/checkout/components/addresses';
import Payment from '@modules/checkout/components/payment';
import Shipping from '@modules/checkout/components/shipping';
import { useCart } from 'medusa-react';

const CheckoutForm = () => {
  const { cart } = useCart();

  if (!cart?.id) {
    return null;
  }

  return (
    <div className="grid w-full gap-y-6">
      <Addresses />
      <Shipping cart={cart} />
      <Payment />
    </div>
  );
};

export default CheckoutForm;
