import { itemSchema } from '@/lib/validators/item';
import { todoSchema } from '@/lib/validators/todo';
import { z } from 'zod';

export type Todo = z.infer<typeof todoSchema>;
export type Item = z.infer<typeof itemSchema>;
