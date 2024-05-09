import { CheckIcon } from 'lucide-react';
import { Progress } from './ui/progress';

import { Item } from '@/types';
import TodoItemActions from './todo-item-actions';

interface TodoItemProps {
  todoItem: Item;
  todoId: number;
}

const TodoItem = ({ todoItem, todoId }: TodoItemProps) => {
  const { name, progress_percentage } = todoItem;

  return (
    <div className="bg-[#FAFAFA] border border-border rounded p-4">
      <p className="font-bold text-sm">{name}</p>

      <div className="border-b-[2px] border-dashed my-2" />

      <div className="flex gap-3 items-center">
        <Progress
          value={progress_percentage}
          indicatorClassName={`${
            progress_percentage === 100 && 'bg-[#43936C]'
          }`}
        />
        {progress_percentage === 100 ? (
          <span className="bg-[#43936C] rounded-full p-1">
            <CheckIcon strokeWidth={5} size={9} className="text-background" />
          </span>
        ) : (
          <span className="text-muted-foreground text-xs">
            {progress_percentage}%
          </span>
        )}

        <TodoItemActions todoItem={todoItem} todoId={todoId} />
      </div>
    </div>
  );
};

export default TodoItem;
