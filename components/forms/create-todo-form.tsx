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
import { createTodoSchema } from '@/lib/validators/todo';
import { Textarea } from '../ui/textarea';
import React from 'react';
import { cn } from '@/lib/utils';
import { useAction } from 'next-safe-action/hooks';
import { createTodo } from '@/app/_actions/todo';
import SubmitButton from '../submit-button';
import { toast } from 'sonner';

type CreateTodoType = z.infer<typeof createTodoSchema>;

interface CreateTodoFormProps extends React.ComponentPropsWithoutRef<'form'> {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * Renders a form for creating a todo.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.setIsDialogOpen - A function to set the dialog open state.
 * @param {string} props.className - The CSS class name for the form.
 * @param {Object} props... - Any other props to be spread on the form element.
 * @returns {JSX.Element} The rendered component.
 */
export default function CreateTodoForm({
  setIsDialogOpen,
  className,
  ...props
}: CreateTodoFormProps) {
  const defaultValues = {
    title: '',
    description: '',
  } satisfies CreateTodoType;

  const form = useForm<CreateTodoType>({
    resolver: zodResolver(createTodoSchema),
    defaultValues,
  });

  const { execute, status } = useAction(createTodo, {
    onSuccess: () => {
      toast.success('Todo created successfully');
      setIsDialogOpen(false);
      form.reset(defaultValues);
    },
    onError: (error) => {
      console.error('Error creating todo', error);
      toast.error('Failed to create todo, please try again later');
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Placehoder"
                  {...field}
                  data-testid="create-todo-title"
                />
              </FormControl>
              <FormMessage data-testid="create-todo-title-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  {...field}
                  data-testid="create-todo-description"
                />
              </FormControl>
              <FormMessage data-testid="create-todo-description-error" />
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
          <SubmitButton text="Submit" isSubmitting={status === 'executing'} />
        </div>
      </form>
    </Form>
  );
}
