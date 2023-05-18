import Spinner from '@icons/spinner';
import { useCheckout } from '@lib/context/checkout-context';
import { Dialog, DialogLoading } from '@modules/ui/dialog';

const CheckoutLoader = () => {
  const { isLoading } = useCheckout();

  return (
    <Dialog open={isLoading}>
      <DialogLoading>
        <Spinner size={24} />
      </DialogLoading>
    </Dialog>
  );
};

export default CheckoutLoader;
