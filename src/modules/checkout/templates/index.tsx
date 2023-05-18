import { CheckoutProvider } from '@lib/context/checkout-context';
import ChevronDown from '@icons/chevron-down';
import Link from 'next/link';
import CheckoutLoader from '../components/checkout-loader';
import CheckoutForm from './checkout-form';
import CheckoutSummary from './checkout-summary';
import Logo from '@modules/common/components/logo';

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="relative bg-accent small:min-h-screen">
        <div className="h-16 bg-white">
          <nav className="content-container flex h-full items-center justify-between">
            <Link
              href="/cart"
              className="text-small-semi flex flex-1 basis-0 items-center gap-x-2 uppercase text-gray-700"
            >
              <ChevronDown className="rotate-90" size={16} />
              <span className="mt-px hidden small:block">
                Back to shopping cart
              </span>
              <span className="mt-px block small:hidden">Back</span>
            </Link>

            <Link href="/" className="hidden md:block">
              <Logo />
            </Link>
            <div className="flex-1 basis-0" />
          </nav>
        </div>
        <div className="relative">
          <CheckoutLoader />
          <div className="content-container grid grid-cols-1 gap-x-8 gap-y-8 py-12 small:grid-cols-[1fr_416px]">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutTemplate;
