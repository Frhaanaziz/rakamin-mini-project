'use client';
import React from 'react';
import CreateTodoForm from '../forms/create-todo-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PlusCircleIcon } from 'lucide-react';
import CreateTodoItemForm from '../forms/create-todo-item-form';

interface CreateTodoItemDialogProps {
  todo_id: number;
}

/**
 * Renders a dialog component for creating a new todo item.
 * @param {CreateTodoItemDialogProps} props - The component props.
 * @param {number} props.todo_id - The ID of the todo item.
 * @returns {JSX.Element} The rendered component.
 */
const CreateTodoItemDialog = ({ todo_id }: CreateTodoItemDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex items-center gap-2 text-xs mt-2.5">
        <PlusCircleIcon size={18} /> New Task
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>

        <CreateTodoItemForm
          className="mt-3"
          setIsDialogOpen={setIsDialogOpen}
          todo_id={todo_id}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateTodoItemDialog;
