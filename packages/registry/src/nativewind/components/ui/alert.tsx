import { Text, TextClassContext } from '@/registry/nativewind/components/ui/text';
import { cn, DARK_INPUT_BG } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const alertVariants = cva('relative w-full rounded-xl border px-3.5 py-3 text-sm', {
  variants: {
    variant: {
      default: cn('border-border bg-transparent', DARK_INPUT_BG),
      error: 'border-destructive/32 bg-destructive/4',
      info: 'border-info/32 bg-info/4',
      success: 'border-success/32 bg-success/4',
      warning: 'border-warning/32 bg-warning/4',
      destructive: 'border-destructive/32 bg-destructive/4',
    },
  },
  defaultVariants: { variant: 'default' },
});

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof View> & VariantProps<typeof alertVariants>) {
  return (
    <TextClassContext.Provider value="text-foreground">
      <View role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('font-medium leading-none', className)} {...props} />;
}

function AlertDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground mt-1 text-sm', className)} {...props} />;
}

function AlertAction({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('mt-2', className)} {...props} />;
}

export { Alert, AlertAction, AlertDescription, AlertTitle, alertVariants };
