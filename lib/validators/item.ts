import { z } from 'zod';
import { todoSchema } from './todo';

export const itemSchema = z.object({
  id: z.number().int(),
  name: z
    .string()
    .trim()
    .min(1, { message: 'Name must be at least 1 character' }),
  progress_percentage: z
    .number()
    .min(0, { message: 'Progress percentage must be at least 0' })
    .max(100, { message: 'Progress percentage must be at most 100' }),
  todo_id: z.number().int(),
  done: z.boolean().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export const getItemsSchema = itemSchema.pick({ todo_id: true });

export const createItemSchema = itemSchema.omit({
  id: true,
  done: true,
  created_at: true,
  updated_at: true,
});

export const updateItemSchema = itemSchema.omit({
  created_at: true,
  updated_at: true,
});

export const deleteItemSchema = itemSchema.pick({
  id: true,
  todo_id: true,
});

export const moveItemSchema = itemSchema
  .pick({
    todo_id: true,
    id: true,
  })
  .extend({ target_todo_id: todoSchema.shape.id });
