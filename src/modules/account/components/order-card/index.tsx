import { Order } from '@medusajs/medusa';
import Thumbnail from '@modules/products/components/thumbnail';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import Button, { buttonVariants } from '@ui/button';
import { Card, CardContent, CardHeader } from '@ui/card';
import { formatAmount } from 'medusa-react';
import Link from 'next/link';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { dateFormat } from '@lib/util/date';
import cn from '@lib/util/cn';

type OrderCardProps = {
  order: Omit<Order, 'beforeInsert'>;
};

const OrderCard = ({ order }: OrderCardProps) => {
  const numberOfLines = useMemo(() => {
    return order.items.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
  }, [order]);

  const numberOfProducts = useMemo(() => {
    return order.items.length;
  }, [order]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between bg-secondary/40 px-4 py-2">
        <div className="flex h-4 items-center gap-2">
          <Text span variant="dark" size="sm">
            Đơn hàng #{order.display_id}
          </Text>
          <Separator orientation="vertical" />
          <Text span variant="dark" size="sm">
            {`${numberOfLines} sản phẩm`}
          </Text>
          <Separator orientation="vertical" />
          <Text span variant="dark" size="sm">
            {formatAmount({
              amount: order.total,
              region: order.region,
              includeTaxes: false,
            })}
          </Text>
        </div>
        <Text variant="dark" size="sm">
          {dayjs(order.created_at).format(dateFormat)}
        </Text>
      </CardHeader>
      <CardContent className="flex flex-col p-4">
        <div className="flex flex-col gap-3">
          {order.items.slice(0, 3).map((item) => {
            return (
              <>
                <div key={item.id} className="flex justify-between">
                  <div className="flex gap-x-2">
                    <div className="w-[70px]">
                      <Thumbnail
                        thumbnail={order.items[0].thumbnail}
                        images={[]}
                        size="full"
                        alt={order.items[0].thumbnail!}
                      />
                    </div>
                    <div className="flex flex-col">
                      <Text variant="dark" size="md" className="font-medium">
                        {item.title}
                      </Text>
                      <Text size="sm" className="font-medium">
                        {`x${item.quantity}`}
                      </Text>
                    </div>
                  </div>
                  <Text variant="dark" size="md" className="font-medium">
                    {formatAmount({
                      amount: item.unit_price,
                      region: order.region,
                      includeTaxes: false,
                    })}
                  </Text>
                </div>
                <Separator />
              </>
            );
          })}
        </div>
        <div className="mt-3">
          <Link
            href={`/order/details/${order.id}`}
            className={cn(
              buttonVariants({ variant: 'outline' }),
              'ml-auto flex w-fit justify-end'
            )}
          >
            Xem chi tiết
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
