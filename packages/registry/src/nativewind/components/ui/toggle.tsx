import { Icon } from '@/registry/nativewind/components/ui/icon';
import { TextClassContext } from '@/registry/nativewind/components/ui/text';
import {
  cn,
  DARK_INPUT_BG,
  DISABLED_OPACITY,
  SURFACE_SHADOW,
} from '@/registry/nativewind/lib/utils';
import * as TogglePrimitive from '@rn-primitives/toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform } from 'react-native';

const toggleVariants = cva(
  cn(
    'group shrink-0 flex-row items-center justify-center gap-2 rounded-lg border border-transparent font-medium',
    Platform.select({
      web: cn(
        'hover:bg-accent focus-visible:ring-ring focus-visible:ring-offset-background inline-flex cursor-default whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none',
        "[&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
      ),
    })
  ),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: cn(
          'border-input bg-background active:bg-input/64',
          SURFACE_SHADOW,
          DARK_INPUT_BG,
          Platform.select({
            web: 'hover:bg-input/64 dark:hover:bg-input/64',
          })
        ),
      },
      size: {
        default: 'h-9 min-w-9 px-2 sm:h-8 sm:min-w-8',
        sm: 'h-8 min-w-8 px-1.5 sm:h-7 sm:min-w-7',
        lg: 'h-10 min-w-10 px-2.5 sm:h-9 sm:min-w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>) {
  return (
    <TextClassContext.Provider
      value={cn(
        'text-sm text-foreground font-medium',
        props.pressed
          ? 'text-accent-foreground'
          : Platform.select({ web: 'group-hover:text-muted-foreground' }),
        className
      )}>
      <TogglePrimitive.Root
        className={cn(
          toggleVariants({ variant, size }),
          props.disabled && DISABLED_OPACITY,
          props.pressed && 'bg-input/64 text-accent-foreground',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function ToggleIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn('size-4 shrink-0', textClass, className)} {...props} />;
}

export { Toggle, ToggleIcon, toggleVariants };
