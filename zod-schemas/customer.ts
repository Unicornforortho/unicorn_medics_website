import { z } from 'zod';

const customerSchema = z.object({
  customerId: z.string().uuid().optional(),
  firstname: z
    .string()
    .min(1, 'Firstname can not be empty')
    .max(64, 'Firstname can not be longer than 64 characters'),
  lastname: z
    .string()
    .min(1, 'Lastname can not be empty')
    .max(64, 'Lastname can not be longer than 64 characters'),
  email: z
    .string()
    .min(1, 'Email can not be empty')
    .max(128, 'Email can not be longer than 128 characters')
    .email(),
  password: z.string().min(1, 'Password can not be empty'),
  country: z
    .string()
    .min(1, 'Country can not be empty')
    .max(64, 'Country can not be longer than 64 characters'),
  speciality: z.enum(
    [
      'HIP',
      'KNEE',
      'SHOULDER',
      'ELBOW',
      'FOOT_AND_ANKLE',
      'WRIST',
      'FINGER_JOINTS',
      'UPPER_LIMB',
      'LOWER_LIMB',
    ],
    {
      errorMap: (issue) => {
        switch (issue.code) {
          case 'invalid_type':
            return {
              message: 'Speciality should be of string type',
            };
          case 'invalid_enum_value':
            return {
              message: 'Select a valid speciality from the options provided',
            };
          default:
            return {
              message: 'Invalid speciality',
            };
        }
      },
    },
  ),
  phone: z.string().max(10, 'Mobile number can not exceed 10 digits').optional(),
  institution: z.string().max(64, 'Institution can not exceed 10 digits').optional(),
});

export default customerSchema;
