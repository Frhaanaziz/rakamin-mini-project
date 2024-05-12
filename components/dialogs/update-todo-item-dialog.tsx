'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import UpdateTodoItemForm from '../forms/update-todo-item-form';
import { Item } from '@/types';

interface UpdateTodoItemDialogProps {
  todoItem: Item;
  children: React.ReactNode;
}

/**
 * Renders a dialog for updating a todo item.
 * @param {UpdateTodoItemDialogProps} props - The component props.
 * @param {TodoItem} props.todoItem - The todo item to be updated.
 * @param {ReactNode} props.dialogTrigger - The trigger element for opening the dialog.
 * @returns {JSX.Element} - The rendered component.
 */
const UpdateTodoItemDialog = ({
  todoItem,
  children,
}: UpdateTodoItemDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent data-no-dnd="true" data-testid={'update-todo-item-dialog'}>
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <UpdateTodoItemForm
          className="mt-3"
          setIsDialogOpen={setIsDialogOpen}
          todoItem={todoItem}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoItemDialog;
