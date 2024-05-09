'use server';

import { backendApi } from '@/lib/axios';
import { getErrorMessage } from '@/lib/utils';
import {
  createItemSchema,
  deleteItemSchema,
  getItemsSchema,
  moveItemSchema,
  updateItemSchema,
} from '@/lib/validators/item';
import { Item } from '@/types';
import { createSafeActionClient } from 'next-safe-action';
import { revalidatePath } from 'next/cache';

export const action = createSafeActionClient();

export const createTodoItem = action(createItemSchema, async (item) => {
  const { todo_id, ...rest } = item;

  const { data } = await backendApi.post(`/todos/${todo_id}/items`, rest);

  revalidatePath('/');
  return data;
});

export const getTodoItems = action(getItemsSchema, async (item) => {
  const { data } = await backendApi.get(`/todos/${item.todo_id}/items`);

  return data as Item[];
});

export const updateTodoItem = action(updateItemSchema, async (item) => {
  const { todo_id, id, ...rest } = item;

  const [_, { data }] = await Promise.all([
    await backendApi.delete(`/todos/${todo_id}/items/${id}`),
    await backendApi.post(`/todos/${todo_id}/items`, rest),
  ]);

  revalidatePath('/');
  return data as Item;
});

export const deleteTodoItem = action(deleteItemSchema, async (item) => {
  const { data } = await backendApi.delete(
    `/todos/${item.todo_id}/items/${item.id}`
  );

  revalidatePath('/');
  return data;
});

export const moveTodoItem = action(moveItemSchema, async (item) => {
  const { todo_id, id, ...rest } = item;

  const { data } = await backendApi.patch(
    `/todos/${todo_id}/items/${id}`,
    rest
  );

  revalidatePath('/');
  return data;
});
