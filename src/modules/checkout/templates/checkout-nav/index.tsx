import Logo from '@modules/common/components/logo';
import Help from '@modules/common/icons/help';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';

const CheckoutNav = () => {
  return (
    <div className="h-16 bg-white">
      <nav className="content-container flex h-full items-center justify-between">
        <Link
          href="/cart"
          className="text-small-semi flex items-center gap-x-1 uppercase text-foreground"
        >
          <IoArrowBackOutline size={24} />
        </Link>

        <Link href="/">
          <Logo />
        </Link>

        <Link href="/help">
          <Help size={28} className="text-foreground" />
        </Link>
      </nav>
    </div>
  );
};

export default CheckoutNav;
