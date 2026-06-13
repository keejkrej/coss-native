import { cn } from '@/registry/nativewind/lib/utils';
import { ScrollView, View } from 'react-native';

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollView>) {
  return (
    <ScrollView className={cn('relative', className)} {...props}>
      {children}
    </ScrollView>
  );
}

function ScrollBar({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('bg-border hidden w-2 rounded-full', className)} {...props} />;
}

export { ScrollArea, ScrollBar };
