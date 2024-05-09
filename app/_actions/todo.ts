'use server';

import { backendApi } from '@/lib/axios';
import { getErrorMessage } from '@/lib/utils';
import { createTodoSchema } from '@/lib/validators/todo';
import { createSafeActionClient } from 'next-safe-action';
import { revalidatePath } from 'next/cache';

export const action = createSafeActionClient();

export const createTodo = action(createTodoSchema, async (values) => {
  try {
    const { data } = await backendApi.post('/todos', values);

    revalidatePath('/');
    return { error: null, data };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { error: getErrorMessage(error), data: null };
  }
});

export const getTodos = async () => {
  try {
    const { data } = await backendApi.get('/todos');

    return { error: null, data };
  } catch (error) {
    console.error('Error getting todos:', error);
    return { error: getErrorMessage(error), data: null };
  }
};
