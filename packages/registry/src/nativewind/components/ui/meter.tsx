import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { View } from 'react-native';

function Meter({ className, value = 0, ...props }: React.ComponentProps<typeof View> & { value?: number }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <View className={cn('w-full', className)} {...props}>
      <MeterTrack>
        <MeterIndicator style={{ width: `${clamped}%` }} />
      </MeterTrack>
    </View>
  );
}

function MeterTrack({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn('bg-input relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    />
  );
}

function MeterIndicator({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('bg-primary h-full', className)} {...props} />;
}

function MeterLabel({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm font-medium', className)} {...props} />;
}

function MeterValue({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue };
