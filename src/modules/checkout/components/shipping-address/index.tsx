import { CheckoutFormValues } from '@lib/context/checkout-context';
import { emailRegex } from '@lib/util/regex';
import ConnectForm from '@common/connect-form';
import Input from '@common/form-input';
import { useMeCustomer } from 'medusa-react';

const ShippingAddress = () => {
  const { customer } = useMeCustomer();
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-2 gap-x-3">
            <Input
              label="First name"
              {...register('shipping_address.first_name', {
                required: 'First name is required',
              })}
              autoComplete="given-name"
              errors={errors}
              touched={touchedFields}
              required
            />
            <Input
              label="Last name"
              {...register('shipping_address.last_name', {
                required: 'Last name is required',
              })}
              autoComplete="family-name"
              errors={errors}
              touched={touchedFields}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <Input
              label="Email"
              {...register('email', {
                required: 'Email is required',
                pattern: emailRegex,
              })}
              autoComplete="email"
              errors={errors}
              touched={touchedFields}
              required
            />
            <Input
              label="Phone"
              {...register('shipping_address.phone')}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
              required
            />
          </div>
          <Input
            label="Street Address, PO Box"
            {...register('shipping_address.address_1', {
              required: 'Address is required',
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
          />
          <Input
            label="Apartments/Unit"
            {...register('shipping_address.address_2')}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
          <div className="grid grid-cols-2 gap-x-3">
            <Input
              label="City"
              {...register('shipping_address.city', {
                required: 'City is required',
              })}
              autoComplete="address-level2"
              errors={errors}
              touched={touchedFields}
              required
            />
            <Input
              label="Postal code"
              {...register('shipping_address.postal_code', {
                required: 'Postal code is required',
              })}
              autoComplete="postal-code"
              errors={errors}
              touched={touchedFields}
              required
            />
          </div>
          <Input
            label="State / Province"
            {...register('shipping_address.province')}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
            required
          />
        </div>
      )}
    </ConnectForm>
  );
};

export default ShippingAddress;
