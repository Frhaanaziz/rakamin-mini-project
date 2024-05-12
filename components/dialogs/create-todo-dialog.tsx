'use client';
import React from 'react';
import CreateTodoForm from '../forms/create-todo-form';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

/**
 * Renders a dialog component for creating a new todo.
 * @returns JSX.Element
 */
const CreateTodoDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState<boolean>(false);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            size={'sm'}
            className="items-center gap-1"
            data-testid="add-new-group-button"
          >
            <span className="text-xl">+</span> Add New Group
          </Button>
        </DialogTrigger>
        <DialogContent data-testid="create-todo-dialog">
          <DialogHeader>
            <DialogTitle>Add New Group</DialogTitle>
          </DialogHeader>

          <CreateTodoForm className="mt-3" setIsDialogOpen={setIsDialogOpen} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTodoDialog;
