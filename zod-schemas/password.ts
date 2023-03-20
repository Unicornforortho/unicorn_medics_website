import { z } from 'zod';

const passwordSchema = z.object({
  password: z
    .string()
    .min(1, 'Password can not be empty')
    .min(6, 'Password minimum length is 6 characters'),
});

export default passwordSchema;
