import { Loader2Icon } from 'lucide-react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';

interface SubmitButtonProps extends ButtonProps {
  text: string;
  isSubmitting: boolean;
}

/**
 * A custom submit button component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.className - Additional CSS class names for the button.
 * @param {boolean} props.isSubmitting - Indicates whether the form is currently submitting.
 * @param {Object} props... - Additional props to be spread onto the button element.
 * @returns {JSX.Element} The rendered SubmitButton component.
 */
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
      data-testid="submit-button"
    >
      {text}
      {isSubmitting && <Loader2Icon size={18} className="animate-spin" />}
    </Button>
  );
};

export default SubmitButton;
