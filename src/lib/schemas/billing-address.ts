import { postalCodeRegex } from '@lib/util/regex';
import { z } from 'zod';

export const billingAddressFormSchema = z.object({
  billing_address: z.object({
    last_name: z.string().min(2).max(50),
    first_name: z.string().min(2).max(50),
    company: z.string().optional(),
    address_1: z.string().min(2),
    address_2: z.string().optional(),
    city: z.string().min(2, 'Thành phố cần có ít nhất 2 kí tự.'),
    province: z.string().min(2, 'Province cần có ít nhất 2 kí tự.'),
    postal_code: z.string().regex(postalCodeRegex, 'Invalid Postal Code'),
    country_code: z.string().optional(),
  }),
});
