import { CheckoutProvider } from '@lib/context/checkout-context';

import Container from '@modules/layout/components/container';
import CheckoutLoader from '../components/checkout-loader';
import CheckoutForm from './checkout-form';
import CheckoutNav from './checkout-nav';
import CheckoutSummary from './checkout-summary';

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="relative bg-accent lg:min-h-screen">
        <CheckoutNav />
        <Container className="relative">
          <CheckoutLoader />
          <div className="grid grid-cols-1 gap-x-5 py-6 lg:grid-cols-[1fr_420px]">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </Container>
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutTemplate;
