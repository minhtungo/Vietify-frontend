import Footer from '@modules/layout/templates/footer';
import Nav from '@modules/layout/templates/nav';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const AuthenticationLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Nav />
      <main className="flex h-full w-full items-start md:h-[calc(100vh-64px)] md:items-center md:justify-center">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default AuthenticationLayout;
