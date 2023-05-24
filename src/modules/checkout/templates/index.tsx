import { CheckoutProvider } from '@lib/context/checkout-context';
import CheckoutLoader from '../components/checkout-loader';
import Stepper from '../components/stepper';
import CheckoutForm from './checkout-form';
import CheckoutNav from './checkout-nav';
import CheckoutSummary from './checkout-summary';

const CheckoutTemplate = () => {
  return (
    <CheckoutProvider>
      <div className="relative bg-accent small:min-h-screen">
        <CheckoutNav />
        <div className="content-container relative">
          <CheckoutLoader />
          <Stepper />
          <div className="grid grid-cols-1 gap-x-8 gap-y-8 py-6 small:grid-cols-[1fr_416px]">
            <CheckoutForm />
            <CheckoutSummary />
          </div>
        </div>
      </div>
    </CheckoutProvider>
  );
};

export default CheckoutTemplate;
