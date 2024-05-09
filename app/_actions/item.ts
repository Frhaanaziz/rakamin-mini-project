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
import { createSafeActionClient } from 'next-safe-action';

export const action = createSafeActionClient();

export const createTodoItem = action(createItemSchema, async (item) => {
  const { todo_id, ...rest } = item;

  try {
    const { data } = await backendApi.post(`/todos/${todo_id}/items`, rest);

    return { error: null, data };
  } catch (error) {
    console.error('Error creating item:', error);
    return { error: getErrorMessage(error), data: null };
  }
});

export const getTodoItems = action(getItemsSchema, async (item) => {
  try {
    const { data } = await backendApi.get(`/todos/${item.todo_id}/items`);

    return { error: null, data };
  } catch (error) {
    console.error('Error getting items:', error);
    return { error: getErrorMessage(error), data: null };
  }
});

export const updateTodoItem = action(updateItemSchema, async (item) => {
  try {
    const { data } = await backendApi.patch(
      `/todos/${item.todo_id}/items/${item.id}`,
      item
    );

    return { error: null, data };
  } catch (error) {
    console.error('Error updating item:', error);
    return { error: getErrorMessage(error), data: null };
  }
});

export const deleteTodoItem = action(deleteItemSchema, async (item) => {
  try {
    const { data } = await backendApi.delete(
      `/todos/${item.todo_id}/items/${item.id}`
    );

    return { error: null, data };
  } catch (error) {
    console.error('Error deleting item:', error);
    return { error: getErrorMessage(error), data: null };
  }
});

export const moveTodoItem = action(moveItemSchema, async (item) => {
  const { todo_id, id, ...rest } = item;

  try {
    const { data } = await backendApi.patch(
      `/todos/${todo_id}/items/${id}`,
      rest
    );

    return { error: null, data };
  } catch (error) {
    console.error('Error moving item:', error);
    return { error: getErrorMessage(error), data: null };
  }
});
