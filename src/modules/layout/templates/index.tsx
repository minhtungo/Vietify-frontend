import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';
import Incentives from '@modules/home/components/incentives';
import React from 'react';
import { Separator } from '@ui/separator';

import { Inter } from 'next/font/google';
import cn from '@lib/util/cn';
import HighlightedBar from '@common/highlighted-bar';
import { TooltipProvider } from '@ui/tooltip';

interface LayoutProps {
  children: React.ReactNode;
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600'],
  display: 'swap',
});

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <HighlightedBar>Free shipping cho đơn hàng trên $50</HighlightedBar>
      <Nav />
      <main className={cn(inter.variable, 'relative font-sans')}>
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
      </main>
      <Separator />
      <Incentives />
      <Separator />
      <Footer />
    </>
  );
};

export default Layout;
