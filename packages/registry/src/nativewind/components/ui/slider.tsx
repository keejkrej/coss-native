import { cn } from '@/registry/nativewind/lib/utils';
import * as SliderPrimitive from '@rn-primitives/slider';
import { Platform, View } from 'react-native';

function Slider({
  className,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn('relative w-full flex-row items-center', className)}
      {...props}>
      <SliderPrimitive.Track className="bg-input relative h-1.5 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className="bg-primary absolute h-full" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          'border-input bg-background block size-4 rounded-full border shadow-sm shadow-black/5',
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
