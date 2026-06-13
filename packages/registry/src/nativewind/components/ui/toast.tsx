import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import * as ToastPrimitive from '@rn-primitives/toast';
import { Platform, View } from 'react-native';

const Toast = ToastPrimitive.Root;

function ToastProvider({ children }: { children: React.ReactNode }) {
  return <View className="relative flex-1">{children}</View>;
}

function ToastViewport({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn(
        'absolute bottom-0 z-50 w-full flex-col gap-2 p-4',
        Platform.select({ web: 'fixed' }),
        className
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Title>) {
  return (
    <ToastPrimitive.Title
      className={cn('text-foreground text-sm font-semibold', className)}
      {...props}
    />
  );
}

function ToastDescription({
  className,
  ...props
}: React.ComponentProps<typeof ToastPrimitive.Description>) {
  return (
    <ToastPrimitive.Description
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitive.Close>) {
  return (
    <ToastPrimitive.Close
      className={cn('absolute right-2 top-2 rounded opacity-70 active:opacity-100', className)}
      {...props}
    />
  );
}

function ToastAction({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('mt-2 flex-row gap-2', className)} {...props} />;
}

export { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport };
