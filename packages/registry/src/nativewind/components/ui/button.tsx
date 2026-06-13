import { Spinner } from '@/registry/nativewind/components/ui/spinner';
import { TextClassContext } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, Pressable, View } from 'react-native';

const buttonVariants = cva(
  cn(
    'relative shrink-0 flex-row items-center justify-center gap-2 rounded-lg border font-medium',
    Platform.select({
      web: "focus-visible:border-ring focus-visible:ring-ring focus-visible:ring-offset-background whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'border-primary bg-primary active:bg-primary/90 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-primary/90' })
        ),
        destructive: cn(
          'border-destructive bg-destructive active:bg-destructive/90 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-destructive/90' })
        ),
        'destructive-outline': cn(
          'border-input bg-popover text-destructive-foreground active:border-destructive/30 active:bg-destructive/5 shadow-sm shadow-black/5 dark:bg-input/30',
          Platform.select({ web: 'hover:border-destructive/30 hover:bg-destructive/5' })
        ),
        outline: cn(
          'border-input bg-popover text-foreground active:bg-accent/50 shadow-sm shadow-black/5 dark:bg-input/30',
          Platform.select({ web: 'hover:bg-accent/50 dark:hover:bg-input/64' })
        ),
        secondary: cn(
          'border-transparent bg-secondary active:bg-secondary/80 shadow-sm shadow-black/5',
          Platform.select({ web: 'hover:bg-secondary/90' })
        ),
        ghost: cn(
          'border-transparent active:bg-accent',
          Platform.select({ web: 'hover:bg-accent' })
        ),
        link: 'border-transparent',
      },
      size: {
        default: 'h-9 px-3',
        xs: 'h-7 gap-1 rounded-md px-2',
        sm: 'h-8 gap-1.5 px-2.5',
        lg: 'h-10 px-3.5',
        xl: 'h-11 px-4 text-lg',
        icon: 'size-9',
        'icon-xs': 'size-7 rounded-md',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
        'icon-xl': 'size-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva(
  cn('text-sm font-medium', Platform.select({ web: 'pointer-events-none' })),
  {
    variants: {
      variant: {
        default: 'text-primary-foreground',
        destructive: 'text-white',
        'destructive-outline': 'text-destructive-foreground',
        outline: 'text-foreground',
        secondary: 'text-secondary-foreground',
        ghost: 'text-foreground',
        link: cn(
          'text-foreground underline-offset-4',
          Platform.select({ web: 'underline', native: 'text-primary' })
        ),
      },
      size: {
        default: '',
        xs: 'text-xs',
        sm: 'text-sm',
        lg: '',
        xl: 'text-lg',
        icon: '',
        'icon-xs': '',
        'icon-sm': '',
        'icon-lg': '',
        'icon-xl': '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

type ButtonProps = React.ComponentProps<typeof Pressable> &
  React.RefAttributes<typeof Pressable> &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const isDisabled = Boolean(loading || disabled);

  return (
    <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
      <Pressable
        className={cn(
          isDisabled && 'opacity-50',
          loading && 'opacity-80',
          buttonVariants({ variant, size }),
          className
        )}
        role="button"
        disabled={isDisabled}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        {...props}>
        <View className={cn('flex-row items-center justify-center gap-2', loading && 'opacity-0')}>
          {typeof children === 'function' ? null : children}
        </View>
        {loading ? (
          <View className="absolute inset-0 items-center justify-center">
            <Spinner className="text-primary-foreground" size={16} />
          </View>
        ) : null}
      </Pressable>
    </TextClassContext.Provider>
  );
}

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };
