'use server';

import { backendApi } from '@/lib/axios';
import { createTodoSchema } from '@/lib/validators/todo';
import { Todo } from '@/types';
import { createSafeActionClient } from 'next-safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

export const action = createSafeActionClient();

export const createTodo = action(createTodoSchema, async (values) => {
  const { data } = await backendApi.post('/todos', values);

  revalidatePath('/');
  return data as Todo;
});

export const getTodos = action(z.undefined(), async () => {
  const { data } = await backendApi.get('/todos');

  return data as Todo[];
});
