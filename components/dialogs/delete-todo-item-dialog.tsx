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
import { Item } from '@/types';
import { useRouter } from 'next/navigation';

type DeleteTodoItemDialogProps = {
  todoItem: Item;
  dialogTrigger: JSX.Element;
  isDeleting?: (boolean: boolean) => void;
};

/**
 * Renders a dialog component for deleting a todo item.
 *
 * @param {DeleteTodoItemDialogProps} props - The component props.
 * @returns {JSX.Element} The rendered DeleteTodoItemDialog component.
 */
function DeleteTodoItemDialog({
  todoItem,
  dialogTrigger,
  isDeleting,
}: DeleteTodoItemDialogProps) {
  const router = useRouter();
  const toastId = useId();
  const { execute: deleteItem } = useAction(deleteTodoItem, {
    onExecute: () => {
      isDeleting?.(true);
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
    onSettled: () => isDeleting?.(false),
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{dialogTrigger}</AlertDialogTrigger>

      <AlertDialogContent data-no-dnd="true">
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
            onClick={() => deleteItem(todoItem)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteTodoItemDialog;
