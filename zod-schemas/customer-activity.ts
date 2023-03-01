import { z } from 'zod';

/*
  Zod schema for customer activity validation
*/
const customerActivitySchema = z.object({
  activityId: z.string().uuid().optional(),
  createdAt: z.date().default(() => new Date()),
  uploadedImageURL: z.string().min(1, 'Image URL can not be empty'),
  predictionMade: z.string().min(1, 'Prediction can not be empty'),
  confidence: z
    .number()
    .min(0, 'Confidence can not be less than 0')
    .max(100, 'Confidence can not be greater than 100%'),
  customerId: z.string().min(1, 'Customer Id can not be empty').uuid(),
});

export default customerActivitySchema;
