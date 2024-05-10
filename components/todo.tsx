import { Todo as TodoType } from '@/types';
import TodoItem from './todo-item';
import { Badge } from './ui/badge';
import { getTodoItems } from '@/app/_actions/item';
import CreateTodoItemDialog from './dialogs/create-todo-item-dialog';
import { todoColorList } from '@/lib/constants';

interface TodoProps {
  todo: TodoType;
  color: (typeof todoColorList)[number];
}

const Todo = async ({ todo, color }: TodoProps) => {
  const { id, title, description } = todo;
  const { data: todoItems } = await getTodoItems({ todo_id: id });
  if (!todoItems) throw new Error('No todo items found');

  return (
    <div
      className={`p-4 border rounded`}
      style={{
        backgroundColor: color.lightColor,
        borderColor: color.deepColor,
      }}
    >
      <Badge
        variant="outline"
        style={{
          color: color.deepColor,
          borderColor: color.deepColor,
        }}
      >
        {title}
      </Badge>
      <p className="my-2 text-xs font-bold">{description}</p>
      <div className="space-y-3">
        {todoItems.length ? (
          todoItems.map((todoItem) => (
            <TodoItem key={todoItem.id} todoItem={todoItem} todoId={id} />
          ))
        ) : (
          <div className="bg-[#FAFAFA] border border-border px-4 py-2.5">
            <p className="text-sm text-muted-foreground">No Task</p>
          </div>
        )}
      </div>

      <CreateTodoItemDialog todo_id={id} />
    </div>
  );
};

export default Todo;
