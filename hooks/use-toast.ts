import { toast } from "@/components/ui/use-toast"

type ToastVariant = 'default' | 'destructive' | 'success';

interface ToastOptions {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export function useToast() {
  const customToast = ({ title, description, variant = 'default', duration = 5000 }: ToastOptions) => {
    if (variant === 'destructive') {
      return toast({
        title,
        description,
        variant: 'destructive',
        duration
      });
    }

    if (variant === 'success') {
      return toast({
        title,
        description,
        variant: 'default',
        duration
      });
    }

    return toast({
      title,
      description,
      duration
    });
  };

  return { toast: customToast };
}
