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
import { createItemSchema } from '@/lib/validators/item';
import { createTodoItem } from '@/app/_actions/item';

type CreateTodoItemType = z.infer<typeof createItemSchema>;

interface CreateTodoItemFormProps
  extends React.ComponentPropsWithoutRef<'form'> {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  todo_id: number;
}

/**
 * Renders a form to create a new todo item.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setIsDialogOpen - A function to set the dialog open state.
 * @param {string} props.todo_id - The ID of the todo item.
 * @param {string} props.className - The CSS class name for the form.
 * @param {Object} props... - Any other additional props for the form.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreateTodoItemForm({
  setIsDialogOpen,
  todo_id,
  className,
  ...props
}: CreateTodoItemFormProps) {
  const defaultValues = {
    name: '',
    progress_percentage: '' as unknown as number,
    todo_id,
  } satisfies CreateTodoItemType;

  const form = useForm<CreateTodoItemType>({
    resolver: zodResolver(createItemSchema),
    defaultValues,
  });

  const { execute, status } = useAction(createTodoItem, {
    onSuccess: () => {
      toast.success('Todo Item created successfully');
      setIsDialogOpen(false);
      form.reset(defaultValues);
    },
    onError: (error) => {
      console.error('Error creating todo item', error);
      toast.error('Failed to create todo item, please try again later');
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
