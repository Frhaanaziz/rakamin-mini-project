import { Todo as TodoType } from '@/types';
import TodoItem from './todo-item';
import { Badge } from './ui/badge';
import { getTodoItems } from '@/app/_actions/item';
import CreateTodoItemDialog from './dialogs/create-todo-item-dialog';

interface TodoProps {
  todo: TodoType;
}

const Todo = async ({ todo }: TodoProps) => {
  const { id, title, description } = todo;
  const { data: todoItems } = await getTodoItems({ todo_id: id });
  if (!todoItems) throw new Error('No todo items found');

  return (
    <div className={`bg-cyan-50/50 p-4 border border-cyan-500 rounded`}>
      <Badge variant="outline" className={`text-cyan-500 border-cyan-500`}>
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
