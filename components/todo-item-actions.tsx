'use client';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EllipsisIcon,
  PencilIcon,
  Trash2Icon,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Item } from '@/types';
import UpdateTodoItemDialog from './dialogs/update-todo-item-dialog';
import DeleteTodoItemDialog from './dialogs/delete-todo-item-dialog';
import { Button } from './ui/button';
import React from 'react';

type TodoItemActionsProps = {
  todoItem: Item;
};

/**
 * Renders the actions for a todo item.
 * @param {TodoItemActionsProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const TodoItemActions = ({ todoItem }: TodoItemActionsProps) => {
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);

  return (
    <Popover>
      <PopoverTrigger className={'ml-2'} data-no-dnd="true" asChild>
        <Button variant={'ghost'} size={'icon'} className="shrink-0">
          <EllipsisIcon className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="space-y-3" data-no-dnd="true">
        <div className="flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer">
          <ArrowRightIcon size={14} strokeWidth={2.5} />
          <span>Move Right</span>
        </div>
        <div className="flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer">
          <ArrowLeftIcon size={14} strokeWidth={2.5} />
          <span>Move Left</span>
        </div>

        <UpdateTodoItemDialog
          dialogTrigger={
            <div className="flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer">
              <PencilIcon size={14} strokeWidth={2.5} />
              <span>Edit</span>
            </div>
          }
          todoItem={todoItem}
        />

        <DeleteTodoItemDialog
          dialogTrigger={
            <div
              className={`flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer ${
                isDeleting && 'opacity-50 pointer-events-none'
              }`}
            >
              <Trash2Icon size={14} strokeWidth={2.5} />
              <span>Delete</span>
            </div>
          }
          isDeleting={setIsDeleting}
          todoItem={todoItem}
        />
      </PopoverContent>
    </Popover>
  );
};

export default TodoItemActions;
