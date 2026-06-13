import { cn, DISABLED_OPACITY } from '@/registry/nativewind/lib/utils';
import * as LabelPrimitive from '@rn-primitives/label';
import { Platform } from 'react-native';

function Label({
  className,
  disabled,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Text>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        'flex flex-row items-center gap-2',
        Platform.select({
          web: 'cursor-default leading-none peer-disabled:opacity-64',
        }),
        disabled && DISABLED_OPACITY
      )}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <LabelPrimitive.Text
        className={cn('text-foreground text-sm font-medium', className)}
        {...props}
      />
    </LabelPrimitive.Root>
  );
}

export { Label };
