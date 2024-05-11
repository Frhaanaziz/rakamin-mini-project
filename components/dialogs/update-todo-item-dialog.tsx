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
  todoId: number;
  todoItem: Item;
  dialogTrigger: JSX.Element;
}

const UpdateTodoItemDialog = ({
  todoId,
  todoItem,
  dialogTrigger,
}: UpdateTodoItemDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>

      <DialogContent data-no-dnd="true">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <UpdateTodoItemForm
          className="mt-3"
          setIsDialogOpen={setIsDialogOpen}
          todoId={todoId}
          todoItem={todoItem}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoItemDialog;
