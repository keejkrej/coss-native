import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function Fieldset({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-4', className)} {...props} />;
}

function FieldsetLegend({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm font-medium', className)} {...props} />;
}

export { Fieldset, FieldsetLegend };
