import { TodoDragData, TodoWithItems } from '@/types';
import TodoItem from './todo-item';
import { Badge } from './ui/badge';
import CreateTodoItemDialog from './dialogs/create-todo-item-dialog';
import { todoColorList } from '@/lib/constants';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';

interface TodoProps {
  todo: TodoWithItems;
  color: (typeof todoColorList)[number];
}

/**
 * Renders a Todo component.
 *
 * @param {TodoProps} props - The props object containing the todo and color information.
 * @returns {JSX.Element} The rendered Todo component.
 */
const Todo = ({ todo, color }: TodoProps) => {
  const { id, title, description, items: todoItems } = todo;
  const todoItemsIds = useMemo(
    () => todoItems.map((item) => item.id),
    [todoItems]
  );

  const { setNodeRef, transform, transition } = useSortable({
    id: todo.id,
    data: {
      type: 'Todo',
      todo,
    } satisfies TodoDragData,
    attributes: {
      roleDescription: `Todo: ${todo.title}`,
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      className={`p-4 border rounded`}
      style={{
        backgroundColor: color.lightColor,
        borderColor: color.deepColor,
        ...style,
      }}
    >
      <Badge
        variant="outline"
        style={{
          color: color.deepColor,
          borderColor: color.deepColor,
        }}
        data-testid="todo-title"
      >
        {title}
      </Badge>
      <p className="my-2 text-xs font-bold" data-testid="todo-description">
        {description}
      </p>
      <div className="space-y-3">
        <SortableContext items={todoItemsIds}>
          {todoItems.length ? (
            todoItems.map((todoItem) => (
              <TodoItem key={todoItem.id} todoItem={todoItem} />
            ))
          ) : (
            <div className="bg-[#FAFAFA] border border-border px-4 py-2.5">
              <p className="text-sm text-muted-foreground">No Task</p>
            </div>
          )}
        </SortableContext>
      </div>

      <CreateTodoItemDialog todo_id={id} />
    </div>
  );
};

export default Todo;
