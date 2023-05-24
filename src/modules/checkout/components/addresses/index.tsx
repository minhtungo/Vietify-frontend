import Spinner from '@icons/spinner';
import { useCheckout } from '@lib/context/checkout-context';
import { Checkbox } from '@modules/ui/checkbox';
import { Label } from '@modules/ui/label';
import Button from '@ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { useMeCustomer } from 'medusa-react';
import BillingAddress from '../billing_address';
import SavedAddress from '../saved-address';
import ShippingAddress from '../shipping-address';

const Addresses = () => {
  const {
    sameAsBilling: { state: checked, toggle: onChange },
    editAddresses: { state: isEdit, toggle: setEdit },
    setAddresses,
    handleSubmit,
    cart,
  } = useCheckout();
  const { customer } = useMeCustomer();
  return (
    <Card>
      <CardHeader className="mb-2">
        <CardTitle>Địa Chỉ Giao Hàng</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        {isEdit ||
        (customer && (customer.billing_addresses?.length || 0) > 0) ? (
          <>
            <ShippingAddress />
            <div className="mt-6 flex items-center space-x-2">
              <Checkbox
                id="same-billing"
                checked={checked}
                onCheckedChange={onChange}
              />
              <Label htmlFor="same-billing">Same as billing address</Label>
            </div>
            {!checked && (
              <>
                <CardTitle className="pb-6 pt-8">Billing address</CardTitle>
                <BillingAddress />
              </>
            )}
            <Button
              className="mt-6 max-w-[200px]"
              onClick={handleSubmit(setAddresses)}
            >
              Continue to delivery
            </Button>
          </>
        ) : (
          <>
            <div className="bg-accent/30 px-6 py-4">
              {cart && cart.shipping_address ? (
                <SavedAddress
                  address={cart.shipping_address}
                  email={cart.email}
                  title="Giao tới"
                />
              ) : (
                <Spinner />
              )}
            </div>
            {!checked && (
              <div className="mt-4 bg-accent/30 px-6 py-4">
                {cart && cart.billing_address ? (
                  <SavedAddress
                    address={cart.billing_address}
                    email={cart.email}
                    title="Địa chỉ thanh toán"
                  />
                ) : (
                  <Spinner />
                )}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Addresses;
