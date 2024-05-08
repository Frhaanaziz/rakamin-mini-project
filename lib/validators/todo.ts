import { z } from 'zod';

export const todoSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1, { message: 'Title must be at least 1 character' }),
  description: z
    .string()
    .min(1, { message: 'Description must be at least 1 character' }),
  created_by: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const createTodoSchema = todoSchema.pick({
  title: true,
  description: true,
});
