'use server';

import { backendApi } from '@/lib/axios';
import { createTodoSchema, deleteTodoSchema } from '@/lib/validators/todo';
import { Todo } from '@/types';
import { createSafeActionClient } from 'next-safe-action';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const action = createSafeActionClient();

/**
 * Retrieves the list of todos from the backend API.
 * @returns A promise that resolves to an array of Todo objects.
 */
export const getTodos = action(z.undefined(), async () => {
  const { data } = await backendApi.get('/todos');

  return data as Todo[];
});

/**
 * Creates a new todo item.
 *
 * @param values - The values for the new todo item.
 * @returns The created todo item.
 */
export const createTodo = action(createTodoSchema, async (values) => {
  const { data } = await backendApi.post('/todos', values);

  revalidatePath('/');
  return data as Todo;
});

export const deleteTodo = action(deleteTodoSchema, async ({ id }) => {
  await backendApi.delete(`/todos/${id}`);

  revalidatePath('/');
});
