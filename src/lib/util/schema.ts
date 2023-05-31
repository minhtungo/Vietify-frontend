import { z } from 'zod';
import { passwordRegex } from './regex';

export const passwordSchema = z
  .string()
  .min(8, 'Mật khẩu cần có ít nhất 8 ký tự.')
  .max(50, 'Mật khẩu có thể có tối đa 50 ký tự.')
  .regex(
    passwordRegex,
    'Mật khẩu phải có ít nhất 1 chữ hoa, 1 ký tự đặc biệt và 1 số.'
  );
