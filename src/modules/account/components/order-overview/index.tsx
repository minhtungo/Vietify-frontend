import EmptyState from '@modules/common/components/empty-state';
import Loader from '@modules/common/components/loader';
import { useCustomerOrders } from 'medusa-react';
import OrderCard from '../order-card';

const OrderOverview = () => {
  const { orders, isLoading } = useCustomerOrders();

  if (isLoading) {
    return <Loader open={isLoading} />;
  }

  if (orders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {orders.map((o) => (
          <div
            key={o.status}
            className="border-b border-gray-200 pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <EmptyState
      title="Nothing to see here"
      subtitle="Chưa có đơn hàng nào"
      showButton
    />
  );
};

export default OrderOverview;
