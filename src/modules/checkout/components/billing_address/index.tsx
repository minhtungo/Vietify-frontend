import ConnectForm from '@common/connect-form';
import Input from '@common/form-input';
import { CheckoutFormValues } from '@lib/context/checkout-context';
import CountrySelect from '../country-select';

const BillingAddress = () => {
  return (
    <ConnectForm<CheckoutFormValues>>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-4">
          <div className="grid grid-cols-2 gap-x-3">
            <Input
              label="First name"
              {...register('billing_address.first_name', {
                required: 'First name is required',
              })}
              autoComplete="given-name"
              errors={errors}
              touched={touchedFields}
              required
            />
            <Input
              label="Last name"
              {...register('billing_address.last_name', {
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
              label="Phone"
              {...register('billing_address.phone')}
              autoComplete="tel"
              errors={errors}
              touched={touchedFields}
              required
            />
          </div>
          <Input
            label="Street Address, PO Box"
            {...register('billing_address.address_1', {
              required: 'Address is required',
            })}
            autoComplete="address-line1"
            errors={errors}
            touched={touchedFields}
            required
          />
          <Input
            label="Apartments/Unit"
            {...register('billing_address.address_2')}
            autoComplete="address-line2"
            errors={errors}
            touched={touchedFields}
          />
          <div className="grid grid-cols-2 gap-x-3">
            <Input
              label="City"
              {...register('billing_address.city', {
                required: 'City is required',
              })}
              autoComplete="address-level2"
              errors={errors}
              touched={touchedFields}
              required
            />
            <Input
              label="Postal code"
              {...register('billing_address.postal_code', {
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
            {...register('billing_address.province')}
            autoComplete="address-level1"
            errors={errors}
            touched={touchedFields}
            required
          />
          <Input
            label="Company"
            {...register('billing_address.company')}
            autoComplete="organization"
            errors={errors}
            touched={touchedFields}
          />
          <CountrySelect
            {...register('billing_address.country_code', {
              required: 'Country is required',
            })}
            autoComplete="country"
            errors={errors}
            touched={touchedFields}
          />
        </div>
      )}
    </ConnectForm>
  );
};

export default BillingAddress;
