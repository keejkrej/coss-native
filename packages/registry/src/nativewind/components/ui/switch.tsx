import { cn, DISABLED_OPACITY, SURFACE_SHADOW } from '@/registry/nativewind/lib/utils';
import * as SwitchPrimitives from '@rn-primitives/switch';
import { Platform } from 'react-native';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitives.Root>) {
  return (
    <SwitchPrimitives.Root
      className={cn(
        'h-[22px] w-[38px] shrink-0 flex-row items-center rounded-full border border-transparent p-px',
        Platform.select({
          web: 'focus-visible:border-ring focus-visible:ring-ring/50 inline-flex outline-none focus-visible:ring-[3px]',
        }),
        props.checked ? 'bg-primary' : 'bg-input',
        props.disabled && DISABLED_OPACITY,
        className
      )}
      {...props}>
      <SwitchPrimitives.Thumb
        className={cn(
          'bg-background size-5 rounded-full',
          SURFACE_SHADOW,
          Platform.select({ web: 'pointer-events-none block' }),
          props.checked
            ? 'dark:bg-primary-foreground translate-x-4'
            : 'dark:bg-foreground translate-x-0'
        )}
      />
    </SwitchPrimitives.Root>
  );
}

export { Switch };
