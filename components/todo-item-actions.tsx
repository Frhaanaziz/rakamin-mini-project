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
import { moveTodoItem as moveTodoItemAction } from '@/app/_actions/item';
import { useAction } from 'next-safe-action/hooks';
import { useTodosContext } from '@/contexts/TodosContext';

type TodoItemActionsProps = {
  todoItem: Item;
};

/**
 * Renders the actions for a todo item.
 * @param {TodoItemActionsProps} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
const TodoItemActions = ({ todoItem }: TodoItemActionsProps) => {
  const todos = useTodosContext();
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const { execute: moveTodoItem, status } = useAction(moveTodoItemAction);

  /**
   * Determines whether the todo item can be moved to the right.
   * @returns {boolean} True if the todo item can be moved to the right, false otherwise.
   */
  const canMoveRight = React.useMemo(() => {
    if (!todos) return false;

    const todoIndex = todos.findIndex((todo) => todo.id === todoItem.todo_id);
    return todoIndex !== todos.length - 1;
  }, [todos, todoItem.todo_id]);

  /**
   * Determines whether the todo item can be moved to the left.
   * @returns {boolean} True if the todo item can be moved to the left, false otherwise.
   */
  const canMoveLeft = React.useMemo(() => {
    if (!todos) return false;

    const todoIndex = todos.findIndex((todo) => todo.id === todoItem.todo_id);
    return todoIndex !== 0;
  }, [todos, todoItem.todo_id]);

  /**
   * Moves the current todo item to the right.
   * @returns {Promise<void>} A promise that resolves when the move operation is complete.
   */
  async function handleMoveRight() {
    if (!todos) return;

    const todoIndex = todos.findIndex((todo) => todo.id === todoItem.todo_id);
    const nextTodoIndex = todoIndex + 1;
    const nextTodo = todos[nextTodoIndex];

    moveTodoItem({
      id: todoItem.id,
      todo_id: todoItem.todo_id,
      target_todo_id: nextTodo.id,
    });
  }

  /**
   * Moves the current todo item to the left by updating its target_todo_id.
   *
   * @returns {Promise<void>} A promise that resolves when the todo item is moved.
   */
  async function handleMoveLeft() {
    if (!todos) return;

    const todoIndex = todos.findIndex((todo) => todo.id === todoItem.todo_id);
    const previousTodoIndex = todoIndex - 1;
    const previousTodo = todos[previousTodoIndex];

    moveTodoItem({
      id: todoItem.id,
      todo_id: todoItem.todo_id,
      target_todo_id: previousTodo.id,
    });
  }

  return (
    <Popover>
      <PopoverTrigger className={'ml-2'} data-no-dnd="true" asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="shrink-0"
          data-testid="todo-item-actions-button"
        >
          <EllipsisIcon className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="space-y-3"
        data-no-dnd="true"
        data-testid="todo-item-actions-popover"
      >
        {canMoveRight && (
          <div
            className={`flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer ${
              status === 'executing' || !todos
                ? 'opacity-50 pointer-events-none'
                : ''
            }`}
            onClick={handleMoveRight}
            data-testid="move-right-button"
          >
            <ArrowRightIcon size={14} strokeWidth={2.5} />
            <span>Move Right</span>
          </div>
        )}

        {canMoveLeft && (
          <div
            className={`flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer ${
              status === 'executing' || !todos
                ? 'opacity-50 pointer-events-none'
                : ''
            }`}
            onClick={handleMoveLeft}
            data-testid="move-left-button"
          >
            <ArrowLeftIcon size={14} strokeWidth={2.5} />
            <span>Move Left</span>
          </div>
        )}

        <UpdateTodoItemDialog todoItem={todoItem}>
          <div
            className="flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer"
            data-testid="update-todo-item-button"
          >
            <PencilIcon size={14} strokeWidth={2.5} />
            <span>Edit</span>
          </div>
        </UpdateTodoItemDialog>

        <DeleteTodoItemDialog isDeleting={setIsDeleting} todoItem={todoItem}>
          <div
            className={`flex items-center gap-4 text-sm hover:text-primary transition font-semibold hover:cursor-pointer ${
              isDeleting && 'opacity-50 pointer-events-none'
            }`}
            data-testid="delete-todo-item-button"
          >
            <Trash2Icon size={14} strokeWidth={2.5} />
            <span>Delete</span>
          </div>
        </DeleteTodoItemDialog>
      </PopoverContent>
    </Popover>
  );
};

export default TodoItemActions;
