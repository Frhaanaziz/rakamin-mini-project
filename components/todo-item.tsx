'use client';
import { CheckIcon } from 'lucide-react';
import { Progress } from './ui/progress';
import { Item, ItemDragData } from '@/types';
import TodoItemActions from './todo-item-actions';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cva } from 'class-variance-authority';

interface TodoItemProps {
  todoItem: Item;
}

/**
 * Renders a single todo item.
 * @param {TodoItemProps} props - The props containing the todo item data.
 * @returns {JSX.Element} The rendered todo item component.
 */
const TodoItem = ({ todoItem }: TodoItemProps) => {
  const { id, name, progress_percentage } = todoItem;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: 'Item',
      item: todoItem,
    } satisfies ItemDragData,
    attributes: {
      roleDescription: 'Task',
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva('bg-[#FAFAFA] border border-border rounded p-4', {
    variants: {
      dragging: {
        default: '',
        over: 'opacity-40',
      },
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={variants({
        dragging: isDragging ? 'over' : undefined,
      })}
    >
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

        <TodoItemActions todoItem={todoItem} />
      </div>
    </div>
  );
};

export default TodoItem;
