import ConnectForm from '@common/connect-form';
import { emailRegex } from '@lib/util/regex';
import { Input } from '@modules/ui/input';
import { Label } from '@modules/ui/label';
import Text from '@modules/ui/text';
import { states } from '@static/content';
import { useMeCustomer } from 'medusa-react';

import cn from '@lib/util/cn';
import ChevronDownIcon from '@modules/common/icons/chevron-down';
import { buttonVariants } from '@modules/ui/button';
import AddressSelect from '../address-select';

const ShippingAddress = () => {
  const { customer } = useMeCustomer();

  return (
    <div>
      {customer && customer.shipping_addresses?.length > 0 && (
        <div className="mb-4 flex flex-col gap-y-4 bg-accent/50 p-4">
          <Text variant="dark" size="sm">
            {`Hi ${customer?.first_name}, do you want to use one of your saved addresses?`}
          </Text>
          <AddressSelect addresses={customer.shipping_addresses} />
        </div>
      )}

      <ConnectForm>
        {({ register, formState: { errors, touchedFields } }) => (
          <div className="grid grid-cols-1 gap-y-3">
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-name">Tên</Label>
                <Input
                  {...register('shipping_address.first_name', {
                    required: 'First name is required',
                  })}
                  name="shipping_address.first_name"
                  autoComplete="given-name"
                  id="first-name"
                  errors={errors}
                  touched={touchedFields}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Họ</Label>
                <Input
                  {...register('shipping_address.last_name', {
                    required: 'Last name is required',
                  })}
                  autoComplete="family-name"
                  id="last-name"
                  errors={errors}
                  touched={touchedFields}
                  required
                />
              </div>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: emailRegex,
                  })}
                  autoComplete="email"
                  id="email"
                  errors={errors}
                  touched={touchedFields}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone-number">Số điện thoại</Label>
                <Input
                  {...register('shipping_address.phone')}
                  autoComplete="tel"
                  id="phone-number"
                  errors={errors}
                  touched={touchedFields}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address-line1">Địa chỉ</Label>
              <Input
                {...register('shipping_address.address_1', {
                  required: 'Address is required',
                })}
                autoComplete="address-line1"
                id="address-line1"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address-line2">Apartments/Unit</Label>
              <Input
                {...register('shipping_address.address_2')}
                autoComplete="address-line2"
                id="address-line2"
                errors={errors}
                touched={touchedFields}
              />
            </div>

            <div className="grid gap-3 md:grid-cols-4">
              <div className="col-span-2 space-y-2">
                <Label htmlFor="city">Thành phố</Label>
                <Input
                  {...register('shipping_address.city', {
                    required: 'City is required',
                  })}
                  autoComplete="address-level2"
                  id="city"
                  errors={errors}
                  touched={touchedFields}
                  required
                />
              </div>
              <div className="relative space-y-2">
                <Label htmlFor="state">State</Label>
                <select
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'w-full appearance-none bg-transparent text-sm font-normal text-muted-foreground'
                  )}
                  {...register('shipping_address.province', {
                    required: 'Province is required',
                  })}
                >
                  {states.map((state) => (
                    <option value={state.code} key={state.code}>
                      {state.name}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 h-4 w-4 opacity-50" />
              </div>
              <div className="space-y-2 ">
                <Label htmlFor="postal-code">Postal code</Label>
                <Input
                  {...register('shipping_address.postal_code', {
                    required: 'Postal code is required',
                  })}
                  autoComplete="postal-code"
                  id="postal-code"
                  errors={errors}
                  touched={touchedFields}
                  required
                />
              </div>
            </div>
          </div>
        )}
      </ConnectForm>
    </div>
  );
};

export default ShippingAddress;
