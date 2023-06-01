import ChevronDown from '@icons/chevron-down';
import User from '@icons/user';
import { getProfileCompletion } from '@lib/util/get-profile-completion';
import { Customer, Order } from '@medusajs/medusa';
import MapPin from '@modules/common/icons/map-pin';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@modules/ui/card';
import Heading from '@modules/ui/heading';
import { Separator } from '@modules/ui/separator';
import Text from '@modules/ui/text';
import { accountNavItems } from '@static/routes';
import { formatAmount } from 'medusa-react';
import Link from 'next/link';

type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, 'password_hash'>;
};

const Overview = ({ orders, customer }: OverviewProps) => {
  return (
    <div>
      <div className="md:hidden">
        <div className="text-large-semi mb-3 px-6">
          Xin chào {customer?.first_name}
        </div>
        <ul>
          {accountNavItems.map((item) => {
            // const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between border-b border-border px-6 py-4"
                >
                  <div className="flex items-center gap-x-1.5">
                    <User size={18} />
                    <Text variant="dark" span>
                      {item.title}
                    </Text>
                  </div>
                  <ChevronDown className="-rotate-90 transform text-foreground/90" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="hidden md:block">
        <Heading className="mb-4">Tổng quan</Heading>

        <div className="flex h-full flex-1 flex-col gap-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Profile</CardTitle>
                <User className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-x-1 text-2xl font-bold">
                  {getProfileCompletion(customer)}%
                  <span className="text-xs text-muted-foreground">
                    completed
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Addresses</CardTitle>
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-x-1 text-2xl font-bold">
                  {customer?.shipping_addresses?.length || 0}
                  <span className="text-xs text-muted-foreground">saved</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Đơn hàng gần đây</CardTitle>
              <CardDescription>
                Bạn đã có {orders ? orders.length : 0} đơn hàng.
              </CardDescription>
            </CardHeader>
            {orders && orders.length > 0 && (
              <CardContent className="pb-6">
                <ul>
                  {orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link href={`/order/details/${order.id}`}>
                          <Card className="bg-secondary/50">
                            <CardContent className="flex items-center justify-between p-4">
                              <div className="text-small-regular grid flex-1 grid-cols-3 grid-rows-2 gap-x-4">
                                <span className="font-semibold">
                                  Ngày đặt hàng
                                </span>
                                <span className="font-semibold">
                                  Số đơn hàng
                                </span>
                                <span className="font-semibold">Tổng cộng</span>
                                <span>
                                  {new Date(order.created_at).toDateString()}
                                </span>
                                <span>#{order.display_id}</span>
                                <span>
                                  {formatAmount({
                                    amount: order.total,
                                    region: order.region,
                                    includeTaxes: false,
                                  })}
                                </span>
                              </div>
                              <button
                                className="flex items-center justify-between"
                                onClick={close}
                              >
                                <span className="sr-only">
                                  Go to order #{order.display_id}
                                </span>
                                <ChevronDown className="-rotate-90" />
                              </button>
                            </CardContent>
                          </Card>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Overview;
