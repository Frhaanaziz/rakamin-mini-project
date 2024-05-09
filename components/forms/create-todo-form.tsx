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
                <Input placeholder="Placehoder" {...field} />
              </FormControl>
              <FormMessage />
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
                <Textarea placeholder="Placeholder" {...field} />
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
          <SubmitButton text="Submit" isSubmitting={status === 'executing'} />
        </div>
      </form>
    </Form>
  );
}