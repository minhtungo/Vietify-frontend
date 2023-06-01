import Heading from '@modules/ui/heading';
import OrderOverview from '../components/order-overview';

const OrdersTemplate = () => {
  return (
    <div className="w-full">
      <Heading className="mb-4">Đơn hàng của tôi</Heading>

      <OrderOverview />
    </div>
  );
};

export default OrdersTemplate;
