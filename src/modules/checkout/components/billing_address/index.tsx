import { Input } from '@modules/ui/input';
import { Label } from '@modules/ui/label';
import ConnectForm from '@modules/common/components/connect-form';
import cn from '@lib/util/cn';
import { buttonVariants } from '@modules/ui/button';
import ChevronDownIcon from '@modules/common/icons/chevron-down';
import { states } from '@static/content';

// <ConnectForm<CheckoutFormValues>>

const BillingAddress = () => {
  return (
    <ConnectForm>
      {({ register, formState: { errors, touchedFields } }) => (
        <div className="grid grid-cols-1 gap-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="billing-first-name">Tên</Label>
              <Input
                {...register('billing_address.first_name', {
                  required: 'First name is required',
                })}
                name="billing_address.first_name"
                autoComplete="given-name"
                id="billing-first-name"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billing-last-name">Họ</Label>
              <Input
                {...register('billing_address.last_name', {
                  required: 'Last name is required',
                })}
                name="billing_address.last_name"
                autoComplete="family-name"
                id="billing-last-name"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="billing-phone-number">Số điện thoại</Label>
              <Input
                {...register('billing_address.phone')}
                autoComplete="tel"
                id="billing-phone-number"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-address-line1">Địa chỉ</Label>
            <Input
              {...register('billing_address.address_1', {
                required: 'Address is required',
              })}
              autoComplete="address-line1"
              id="billing-address-line1"
              errors={errors}
              touched={touchedFields}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="billing-address-line2">Apartments/Unit</Label>
            <Input
              {...register('billing_address.address_2')}
              autoComplete="address-line2"
              id="billing-address-line2"
              errors={errors}
              touched={touchedFields}
            />
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="col-span-2 space-y-2">
              <Label htmlFor="billing-city">Thành phố</Label>
              <Input
                {...register('billing_address.city', {
                  required: 'City is required',
                })}
                autoComplete="address-level2"
                id="billing-city"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
            <div className="relative space-y-2">
              <Label htmlFor="billing-state">State</Label>
              <select
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'w-full appearance-none bg-transparent text-sm font-normal text-muted-foreground'
                )}
                {...register('billing_address.province', {
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
            <div className="space-y-2">
              <Label htmlFor="billing-postal-code">Postal code</Label>
              <Input
                {...register('billing_address.postal_code', {
                  required: 'Postal code is required',
                })}
                autoComplete="postal-code"
                id="billing-postal-code"
                errors={errors}
                touched={touchedFields}
                required
              />
            </div>
          </div>
        </div>
      )}
    </ConnectForm>
  );
};

export default BillingAddress;
