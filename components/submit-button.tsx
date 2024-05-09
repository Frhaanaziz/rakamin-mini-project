import { Loader2Icon } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends ButtonProps {
  text: string;
  isSubmitting: boolean;
}

const SubmitButton = ({
  text,
  className,
  isSubmitting,
  ...props
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      size={'sm'}
      className={cn('gap-2 items-center', className)}
      disabled={isSubmitting}
      {...props}
    >
      {text}
      {isSubmitting && <Loader2Icon size={18} className="animate-spin" />}
    </Button>
  );
};

export default SubmitButton;
