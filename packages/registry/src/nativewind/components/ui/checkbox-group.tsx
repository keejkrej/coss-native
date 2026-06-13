import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function CheckboxGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex flex-col items-start gap-3', className)} {...props} />
  );
}

export { CheckboxGroup };
