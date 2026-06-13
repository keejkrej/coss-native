import {
  cn,
  DARK_INPUT_BG,
  DISABLED_OPACITY,
  SURFACE_SHADOW,
} from '@/registry/nativewind/lib/utils';
import * as SliderPrimitive from '@rn-primitives/slider';
import { Platform, View } from 'react-native';

function Slider({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn('relative w-full flex-row items-center', disabled && DISABLED_OPACITY, className)}
      disabled={disabled}
      {...props}>
      <SliderPrimitive.Track className="bg-input relative h-1.5 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'border-input bg-background block size-4 rounded-full border',
          SURFACE_SHADOW,
          DARK_INPUT_BG,
          Platform.select({ web: 'focus-visible:ring-ring focus-visible:ring-[3px]' })
        )}
      />
    </SliderPrimitive.Root>
  );
}

function SliderValue({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

export { Slider, SliderValue };
