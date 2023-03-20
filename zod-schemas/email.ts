import { z } from 'zod';

const emailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email can not be empty')
    .max(128, 'Email can not be longer than 128 characters')
    .email(),
});

export default emailSchema;
