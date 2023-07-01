import Edit from '@icons/edit';
import { useCheckout } from '@lib/context/checkout-context';
import useToggleState from '@lib/hooks/use-toggle-state';
import cn from '@lib/util/cn';
import { Address } from '@medusajs/medusa';
import CheckoutShippingAddressModal from '@modules/modal/checkout/shipping-address';
import { Separator } from '@modules/ui/separator';
import Text, { textVariants } from '@modules/ui/text';
import { FC } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressFormSchema } from '@lib/schemas/checkout';

interface savedAddressProps {
  address: Address;
  email: string;
  title: string;
  className?: string;
}

const SavedAddress: FC<savedAddressProps> = ({
  address,
  email,
  className,
  title,
}) => {
  const {
    editAddresses: { state: isEdit, toggle: setEdit },
  } = useCheckout();

  const { state, open, close } = useToggleState(false);

  const {
    last_name,
    first_name,
    address_1,
    address_2,
    city,
    phone,
    postal_code,
    province,
  } = address;

  const form = useForm<z.infer<typeof shippingAddressFormSchema>>({
    resolver: zodResolver(shippingAddressFormSchema),
    defaultValues: {
      shipping_address: {
        ...address,
      },
    },
  });

  return (
    <div className={cn(className)}>
      <h5 className="mb-1 text-sm font-semibold text-muted-foreground">
        {title}
      </h5>
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col md:h-5 md:flex-row md:space-x-1.5">
          <Text size="sm" variant="dark" className="font-semibold">
            {`${first_name} ${last_name}`}
          </Text>
          <Separator orientation="vertical" className="hidden md:block" />
          <Text size="sm" variant="dark" className="font-semibold">
            {email}
          </Text>
        </div>
        <CheckoutShippingAddressModal
          state={state}
          close={close}
          address={address}
          // error={error}
          open={open}
          submitting={false}
          form={form}
        />
      </div>
      <Text size="sm" variant="dark">{`${address_1} ${address_2}`}</Text>
      <Text
        size="sm"
        variant="dark"
      >{`${city} ${postal_code}, ${province}`}</Text>
      <Text size="sm" variant="dark">
        {phone}
      </Text>
    </div>
  );
};

export default SavedAddress;
