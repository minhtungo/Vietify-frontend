import Spinner from '@icons/spinner';
import { useAccount } from '@lib/context/account-context';
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

import Container from '@modules/layout/components/container';
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
    <Container>
      <Card>
        <CardContent className="flex flex-col p-10 lg:flex-row lg:space-x-10">
          <div className="flex flex-col gap-5 lg:w-1/5">
            <CardHeader className="space-y-0.5 p-0">
              <CardTitle>Xin chào {customer?.first_name}</CardTitle>
              <CardDescription className="">{customer?.email}</CardDescription>
            </CardHeader>
            <aside>
              <AccountNav items={accountNavItems} />
            </aside>
          </div>
          <Card className="flex-1">
            <CardContent className="p-0 md:p-6">{children}</CardContent>
          </Card>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AccountLayout;
