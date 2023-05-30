import ChevronDown from '@icons/chevron-down';
import User from '@icons/user';
import { getProfileCompletion } from '@lib/util/get-profile-completion';
import { Customer, Order } from '@medusajs/medusa';
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
        <div className="flex justify-between">
          <Text size="lg" variant="dark" className="font-semibold" span>
            Xin chào {customer?.first_name}
          </Text>
          <Text size="sm" span>
            Đăng nhập bởi:{' '}
            <span className="font-semibold">{customer?.email}</span>
          </Text>
        </div>
        <Separator className="my-4" />
        <div className="flex h-full flex-1 flex-col gap-y-6">
          <div className="flex items-start gap-x-16">
            <div className="flex flex-col gap-y-2">
              <Heading size="sm">Profile</Heading>
              <div className="flex items-end gap-x-2">
                <Text span size="lg" variant="dark" className="font-semibold">
                  {getProfileCompletion(customer)}%
                </Text>
                <Text span variant="dark">
                  Completed
                </Text>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Heading size="sm">Addresses</Heading>
              <div className="flex items-end gap-x-2">
                <Text span size="lg" variant="dark" className="font-semibold">
                  {customer?.shipping_addresses?.length || 0}
                </Text>
                <Text span variant="dark">
                  Saved
                </Text>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <Heading size="sm">Recent orders</Heading>
            <ul className="flex flex-col gap-y-3">
              {orders ? (
                orders.slice(0, 5).map((order) => {
                  return (
                    <li key={order.id}>
                      <Link href={`/order/details/${order.id}`}>
                        <div className="flex items-center justify-between bg-accent/50 p-4">
                          <div className="text-small-regular grid flex-1 grid-cols-3 grid-rows-2 gap-x-4">
                            <span className="font-semibold">Date placed</span>
                            <span className="font-semibold">Order number</span>
                            <span className="font-semibold">Total amount</span>
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
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <Text span>No recent orders</Text>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
