import { z } from 'zod';

export const itemSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1, { message: 'Name must be at least 1 character' }),
  done: z.boolean().nullable(),
  todo_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  progress_percentage: z
    .number()
    .min(0, { message: 'Progress percentage must be at least 0' })
    .max(100, { message: 'Progress percentage must be at most 100' }),
});

export const createItemSchema = itemSchema.pick({
  name: true,
  todo_id: true,
});

export const updateItemSchema = itemSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});
