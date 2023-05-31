import Button from '@ui/button';
import Spinner from '@icons/spinner';
import { useCustomerOrders } from 'medusa-react';
import Link from 'next/link';
import OrderCard from '../order-card';
import Loader from '@modules/common/components/loader';

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
            key={o.id}
            className="border-b border-gray-200 pb-6 last:border-none last:pb-0"
          >
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <h2 className="text-large-semi">Nothing to see here</h2>
      <p className="text-base-regular">
        You don&apos;t have any orders yet, let us change that {':)'}
      </p>
      <div className="mt-4">
        <Link href="/" passHref legacyBehavior>
          <Button>Continue shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default OrderOverview;
