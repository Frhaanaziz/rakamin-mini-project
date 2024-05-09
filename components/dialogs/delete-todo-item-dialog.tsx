import { TriangleAlertIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useAction } from 'next-safe-action/hooks';
import { deleteTodoItem } from '@/app/_actions/item';
import { toast } from 'sonner';
import { useId } from 'react';

type DeleteTodoItemDialogProps = {
  itemId: number;
  todoId: number;
  dialogTrigger: JSX.Element;
};

function DeleteTodoItemDialog({
  itemId,
  todoId,
  dialogTrigger,
}: DeleteTodoItemDialogProps) {
  const toastId = useId();
  const { execute: deleteItem, status } = useAction(deleteTodoItem, {
    onExecute: () => {
      toast.loading('Deleting task...', { id: toastId });
    },
    onSuccess: () => {
      toast.success('Task deleted successfully', { id: toastId });
    },
    onError: (error) => {
      console.error('Error deleting task', error);
      toast.error('Failed to delete task, please try again later', {
        id: toastId,
      });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{dialogTrigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <TriangleAlertIcon
              size={20}
              strokeWidth={2.5}
              className="text-destructive"
            />
            Delete Task
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-2">
            Are you sure want to delete this task? your action can&apos;t be
            reverted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel size={'sm'}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant={'destructive'}
            size={'sm'}
            onClick={() => deleteItem({ id: itemId, todo_id: todoId })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTodoItemDialog;
