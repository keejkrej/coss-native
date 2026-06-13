import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function Form({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-6', className)} {...props} />;
}

export { Form };
