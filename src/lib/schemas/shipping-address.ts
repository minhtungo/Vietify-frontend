import { phoneRegex, postalCodeRegex } from '@lib/util/regex';
import { z } from 'zod';

export const shippingAddressSchema = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  city: z.string().min(2, 'Thành phố cần có ít nhất 2 kí tự.'),
  country_code: z.string().optional(),
  postal_code: z.string().regex(postalCodeRegex, 'Invalid Postal Code'),
  province: z.string().min(2, 'Province cần có ít nhất 2 kí tự.'),
  address_1: z.string().min(2),
  address_2: z.string().optional(),
  phone: z.string().regex(phoneRegex, 'Định dạng số điện thoại không hợp lệ.'),
  company: z.string().optional(),
});
