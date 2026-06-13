import { Label } from '@/registry/nativewind/components/ui/label';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function Field({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-2', className)} {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label className={className} {...props} />;
}

function FieldDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function FieldError({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-destructive text-sm', className)} {...props} />;
}

function FieldControl({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

function FieldItem({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-2', className)} {...props} />;
}

function FieldValidity({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

export {
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
};
