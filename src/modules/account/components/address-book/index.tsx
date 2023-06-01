import { Customer } from '@medusajs/medusa';
import React from 'react';
import AddressCard from '../address-card';
import AddAddress from '../address-card/add-address';

type AddressBookProps = {
  customer: Omit<Customer, 'password_hash'>;
};

const AddressBook: React.FC<AddressBookProps> = ({ customer }) => {
  return (
    <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-3">
      <AddAddress />
      {customer.shipping_addresses.map((address) => {
        return <AddressCard address={address} key={address.id} />;
      })}
    </div>
  );
};

export default AddressBook;
