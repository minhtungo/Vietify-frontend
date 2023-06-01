import EmptyState from '@modules/common/components/empty-state';
import Loader from '@modules/common/components/loader';
import { useCustomerOrders } from 'medusa-react';
import OrderCard from '../order-card';

import { FC } from 'react';

interface OrderOverviewProps {
  orderStatus?: string | undefined;
}

const OrderOverview: FC<OrderOverviewProps> = ({ orderStatus }) => {
  const { orders, isLoading } = useCustomerOrders();

  const filteredOrders =
    orderStatus && orders
      ? orders.filter((order) => order.status === orderStatus)
      : orders;

  if (isLoading) {
    return <Loader open={isLoading} />;
  }

  if (filteredOrders?.length) {
    return (
      <div className="flex w-full flex-col gap-y-8">
        {filteredOrders.map((o) => (
          <OrderCard order={o} key={o.status} />
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
