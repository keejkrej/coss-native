import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const emptyMediaVariants = cva('flex shrink-0 items-center justify-center', {
  variants: {
    variant: {
      default: 'bg-transparent',
      icon: 'border-border bg-card size-9 rounded-md border shadow-sm shadow-black/5',
    },
  },
  defaultVariants: { variant: 'default' },
});

function Empty({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn(
        'flex min-w-0 flex-1 flex-col items-center justify-center gap-6 px-6 py-12',
        className
      )}
      {...props}
    />
  );
}

function EmptyHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex max-w-sm flex-col items-center', className)} {...props} />
  );
}

function EmptyMedia({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof View> & VariantProps<typeof emptyMediaVariants>) {
  return <View className={cn('mb-6', emptyMediaVariants({ variant }), className)} {...props} />;
}

function EmptyTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-center text-xl font-semibold', className)} {...props} />;
}

function EmptyDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text className={cn('text-muted-foreground mt-1 text-center text-sm', className)} {...props} />
  );
}

function EmptyContent({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn('flex w-full max-w-sm flex-col items-center gap-4', className)}
      {...props}
    />
  );
}

export {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  emptyMediaVariants,
};
