'use server';

import { backendApi } from '@/lib/axios';
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

/**
 * Creates a new todo item.
 * @param item - The item object containing the todo_id and other properties.
 * @returns The created todo item.
 */
export const createTodoItem = action(createItemSchema, async (item) => {
  const { todo_id, ...rest } = item;

  const { data } = await backendApi.post(`/todos/${todo_id}/items`, rest);

  revalidatePath('/');
  return data;
});

/**
 * Retrieves the todo items for a specific todo.
 *
 * @param item - The todo item.
 * @returns A promise that resolves to an array of todo items.
 */
export const getTodoItems = action(getItemsSchema, async (item) => {
  const { data } = await backendApi.get(`/todos/${item.todo_id}/items`);

  return data as Item[];
});

/**
 * Updates a todo item.
 *
 * @param item - The item to be updated.
 * @returns The updated item.
 */
export const updateTodoItem = action(updateItemSchema, async (item) => {
  const { todo_id, id, ...rest } = item;

  const [_, { data }] = await Promise.all([
    await backendApi.delete(`/todos/${todo_id}/items/${id}`),
    await backendApi.post(`/todos/${todo_id}/items`, rest),
  ]);

  revalidatePath('/');
  return data as Item;
});

/**
 * Deletes a todo item from the backend server.
 *
 * @param item - The item to be deleted.
 * @returns The deleted item data.
 */
export const deleteTodoItem = action(deleteItemSchema, async (item) => {
  const { data } = await backendApi.delete(
    `/todos/${item.todo_id}/items/${item.id}`
  );

  revalidatePath('/');
  return data;
});

/**
 * Moves a todo item to a new location.
 * @param item - The item to be moved.
 * @returns The updated item data.
 */
export const moveTodoItem = action(moveItemSchema, async (item) => {
  const { todo_id, id, ...rest } = item;

  const { data } = await backendApi.patch(
    `/todos/${todo_id}/items/${id}`,
    rest
  );

  revalidatePath('/');
  return data;
});
