import { Address } from '@medusajs/medusa';
import { Separator } from '@modules/ui/separator';
import Text, { textVariants } from '@modules/ui/text';
import { FC } from 'react';
import { useCheckout } from '@lib/context/checkout-context';
import cn from '@lib/util/cn';
import Heading from '@modules/ui/heading';
import Edit from '@icons/edit';

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
    editAddresses: { toggle: setEdit },
  } = useCheckout();

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

  return (
    <div className={cn(className)}>
      <h5 className="mb-1 text-sm font-semibold text-muted-foreground">
        {title}
      </h5>
      <div className="flex w-full items-start justify-between">
        <div className="flex flex-col md:h-5 md:flex-row md:space-x-1.5">
          <Text
            size="sm"
            variant="dark"
            className="font-semibold"
          >{`${first_name} ${last_name}`}</Text>
          <Separator orientation="vertical" className="hidden md:block" />
          <Text size="sm" variant="dark" className="font-semibold">
            {email}
          </Text>
        </div>
        <button
          onClick={setEdit}
          className={textVariants({
            size: 'sm',
            variant: 'brand',
            className: 'block font-semibold hover:underline',
          })}
        >
          <span className="hidden md:inline">Thay đổi</span>
          <Edit className="block md:hidden" size={16} />
        </button>
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
