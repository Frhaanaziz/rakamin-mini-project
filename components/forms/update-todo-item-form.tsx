'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { cn } from '@/lib/utils';
import { useAction } from 'next-safe-action/hooks';
import SubmitButton from '../submit-button';
import { toast } from 'sonner';
import { updateItemSchema } from '@/lib/validators/item';
import { updateTodoItem } from '@/app/_actions/item';
import { Item } from '@/types';

type UpdateTodoItemType = z.infer<typeof updateItemSchema>;

interface UpdateTodoItemFormProps
  extends React.ComponentPropsWithoutRef<'form'> {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todoItem: Item;
}

/**
 * Renders a form for updating a todo item.
 * @param {Object} props - The component props.
 * @param {Function} props.setIsDialogOpen - A function to set the state of the dialog.
 * @param {string} props.className - The CSS class name for the form.
 * @param {TodoItem} props.todoItem - The todo item to be updated.
 * @returns {JSX.Element} The rendered component.
 */
export default function UpdateTodoItemForm({
  setIsDialogOpen,
  className,
  todoItem,
  ...props
}: UpdateTodoItemFormProps) {
  const defaultValues = todoItem satisfies UpdateTodoItemType;

  const form = useForm<UpdateTodoItemType>({
    resolver: zodResolver(updateItemSchema),
    defaultValues,
  });

  const { execute, status } = useAction(updateTodoItem, {
    onSuccess: () => {
      toast.success('Todo Item updated successfully');
      setIsDialogOpen(false);
      form.reset(defaultValues);
    },
    onError: (error) => {
      console.error('Error updating todo item', error);
      toast.error('Failed to update todo item, please try again later');
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((v) => execute(v))}
        className={cn('space-y-6', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder="Type your Task" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="progress_percentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress</FormLabel>
              <FormControl>
                <Input type="number" placeholder="70%" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-3">
          <Button
            size={'sm'}
            type="button"
            variant={'secondary'}
            disabled={status === 'executing'}
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <SubmitButton
            text="Save Task"
            isSubmitting={status === 'executing'}
          />
        </div>
      </form>
    </Form>
  );
}
