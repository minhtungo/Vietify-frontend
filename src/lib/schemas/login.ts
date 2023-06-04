import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.string().email({
    message: 'Định dạng email không hợp lệ.',
  }),
  password: z.string().min(8),
});
