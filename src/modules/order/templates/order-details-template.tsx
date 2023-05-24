import { Order } from '@medusajs/medusa';
import Help from '@modules/order/components/help';
import Items from '@modules/order/components/items';
import OrderDetails from '@modules/order/components/order-details';
import OrderSummary from '@modules/order/components/order-summary';
import ShippingDetails from '@modules/order/components/shipping-details';
import React from 'react';

type OrderDetailsTemplateProps = {
  order: Order;
};

const OrderDetailsTemplate: React.FC<OrderDetailsTemplateProps> = ({
  order,
}) => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 py-6">
      <div className="content-container flex justify-center">
        <div className="h-full w-full max-w-4xl bg-white">
          <OrderDetails order={order} showStatus />
          <Items
            items={order.items}
            region={order.region}
            cartId={order.cart_id}
          />
          <div className="grid grid-cols-1 gap-4 border-b border-gray-200 p-10 lg:grid-cols-2">
            <ShippingDetails
              shippingMethods={order.shipping_methods}
              address={order.shipping_address}
            />
            <OrderSummary order={order} />
          </div>
          <div className="grid grid-cols-1 gap-4 p-10 lg:grid-cols-2">
            <Help />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsTemplate;
