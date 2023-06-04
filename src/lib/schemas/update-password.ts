import { passwordSchema } from '@lib/util/schema';
import { z } from 'zod';

export const passwordFormSchema = z
  .object({
    old_password: z
      .string()
      .min(8, 'Mật khẩu cần có ít nhất 8 ký tự.')
      .max(50, 'Mật khẩu có thể có tối đa 50 ký tự.'),
    new_password: passwordSchema,
    confirm_password: passwordSchema,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: 'Mật khẩu mới không khớp.',
    path: ['confirm_password'],
  });
