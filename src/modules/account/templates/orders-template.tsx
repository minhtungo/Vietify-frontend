import Heading from '@modules/ui/heading';
import OrderOverview from '../components/order-overview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { useMemo } from 'react';

const OrdersTemplate = () => {
  const tabs = useMemo(() => {
    return [
      {
        label: 'Tất cả đơn',
        component: <OrderOverview />,
      },
      {
        label: 'Đang xử lí',
        component: <OrderOverview orderStatus="pending" />,
      },
      {
        label: 'Đã giao',
        component: <OrderOverview orderStatus="completed" />,
      },
      {
        label: 'Đã hủy',
        component: <OrderOverview orderStatus="canceled" />,
      },
    ];
  }, []);
  return (
    <div className="w-full">
      <Heading className="mb-2">Đơn hàng của tôi</Heading>
      <Tabs defaultValue={tabs[0].label} className="w-full">
        <TabsList className="gap-x-8">
          {tabs.map((tab, i) => {
            return (
              <TabsTrigger
                key={`${tab.label}-trigger`}
                value={tab.label}
                className="text-md px-0 hover:border-gray-400 hover:text-foreground/80"
              >
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>
        {tabs.map((tab, i) => {
          return (
            <TabsContent
              value={tab.label}
              key={`${tab.label}-tab`}
              className="pt-4"
            >
              {tab.component}
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default OrdersTemplate;
