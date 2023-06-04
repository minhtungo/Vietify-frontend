import { passwordSchema } from '@lib/util/schema';
import { z } from 'zod';

export const signupFormSchema = z
  .object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    email: z.string().email({
      message: 'Định dạng email không hợp lệ.',
    }),
    password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Mật khẩu xác thực không khớp.',
    path: ['confirm_password'],
  });
