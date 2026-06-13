import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function Frame({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('bg-muted/70 flex flex-col rounded-2xl p-1', className)} {...props} />
  );
}

function FramePanel({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn(
        'border-border bg-background rounded-xl border p-5 shadow-sm shadow-black/5',
        className
      )}
      {...props}
    />
  );
}

function FrameHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col px-5 py-4', className)} {...props} />;
}

function FrameTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm font-semibold', className)} {...props} />;
}

function FrameDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function FrameFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-row items-center px-5 py-4', className)} {...props} />;
}

export { Frame, FrameDescription, FrameFooter, FrameHeader, FramePanel, FrameTitle };
