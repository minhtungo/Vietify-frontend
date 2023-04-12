import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';
import React from 'react';

import { Inter } from 'next/font/google';
import cn from '@lib/util/cn';

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
    <div>
      <Nav />
      <main className={cn(inter.variable, 'relative font-sans pt-16')}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
