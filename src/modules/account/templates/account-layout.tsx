import Spinner from '@icons/spinner';
import { useAccount } from '@lib/context/account-context';
import { Separator } from '@modules/ui/separator';
import { accountNavItems } from '@static/routes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@ui/card';
import React, { useEffect } from 'react';
import AccountNav from '../components/account-nav';

import { FC } from 'react';

interface accountLayoutProps {
  children: React.ReactNode;
}

const AccountLayout: FC<accountLayoutProps> = ({ children }) => {
  const { customer, retrievingCustomer, checkSession } = useAccount();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (retrievingCustomer || !customer) {
    return (
      <div className="flex h-full min-h-[640px] w-full items-center justify-center text-gray-900">
        <Spinner size={36} />
      </div>
    );
  }

  return (
    <div className="content-container p-10 pb-16">
      <Card className="p-6">
        <CardHeader className="space-y-0.5">
          <CardTitle className="text-2xl tracking-tight">
            Quản lí tài khoản
          </CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Quản lí tài khoản của bạn.
          </CardDescription>
          <Separator className="!my-6" />
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row lg:space-x-12">
          <aside className="lg:w-1/5">
            <AccountNav items={accountNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountLayout;
