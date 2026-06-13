import {
  cn,
  DARK_INPUT_BG,
  DISABLED_OPACITY,
  SURFACE_SHADOW,
} from '@/registry/nativewind/lib/utils';
import * as RadioGroupPrimitive from '@rn-primitives/radio-group';
import { Platform } from 'react-native';

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return <RadioGroupPrimitive.Root className={cn('gap-3', className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      className={cn(
        'border-input bg-background size-4.5 shrink-0 items-center justify-center rounded-full border',
        SURFACE_SHADOW,
        DARK_INPUT_BG,
        Platform.select({
          web: cn(
            'focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-background outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
            'aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48',
            'dark:aria-invalid:ring-destructive/24 disabled:cursor-not-allowed'
          ),
        }),
        props.disabled && DISABLED_OPACITY,
        className
      )}
      {...props}>
      <RadioGroupPrimitive.Indicator className="bg-primary size-2 rounded-full" />
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
