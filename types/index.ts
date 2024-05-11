import { itemSchema } from '@/lib/validators/item';
import { todoSchema } from '@/lib/validators/todo';
import { z } from 'zod';

export type Todo = z.infer<typeof todoSchema>;
export type Item = z.infer<typeof itemSchema>;
export type TodoWithItems = Todo & { items: Item[] };

export interface ItemDragData {
  type: 'Item';
  item: Item;
}

export interface TodoDragData {
  type: 'Todo';
  todo: TodoWithItems;
}

export type DraggableData = ItemDragData | TodoDragData;
