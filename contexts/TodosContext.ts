import { TodoWithItems } from '@/types';
import { createContext, useContext } from 'react';

export const TodosContext = createContext<TodoWithItems[] | undefined>(
  undefined
);

export const useTodosContext = () => useContext(TodosContext);
