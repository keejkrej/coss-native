import { Input } from '@/registry/nativewind/components/ui/input';
import { Text } from '@/registry/nativewind/components/ui/text';
import { Textarea } from '@/registry/nativewind/components/ui/textarea';
import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function InputGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn(
        'border-input bg-background flex w-full flex-row items-center overflow-hidden rounded-lg border shadow-sm shadow-black/5',
        className
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  className,
  ...props
}: React.ComponentProps<typeof View>) {
  return <View className={cn('text-muted-foreground px-3', className)} {...props} />;
}

function InputGroupText({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function InputGroupInput({ className, unstyled = true, ...props }: React.ComponentProps<typeof Input>) {
  return <Input unstyled className={cn('flex-1 border-0', className)} {...props} />;
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return <Textarea className={cn('min-h-20 flex-1 border-0', className)} {...props} />;
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
};
