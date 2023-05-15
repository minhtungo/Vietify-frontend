import { type Region } from '@medusajs/medusa';
import { formatAmount } from 'medusa-react';

export const getAmount = (
  amount: number | null | undefined,
  region: Region
) => {
  return formatAmount({
    amount: amount || 0,
    region: region,
    includeTaxes: false,
  });
};
