import { TextClassContext } from '@/registry/nativewind/components/ui/text';
import { cn, DARK_INPUT_BG } from '@/registry/nativewind/lib/utils';
import { Slot } from '@rn-primitives/slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Platform, View } from 'react-native';

const badgeVariants = cva(
  cn(
    'shrink-0 flex-row items-center justify-center gap-1 overflow-hidden rounded-sm border border-transparent',
    Platform.select({
      web: "focus-visible:ring-ring focus-visible:ring-offset-background whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-offset-1 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-3.5 sm:[&_svg:not([class*='size-'])]:size-3 [&>svg]:pointer-events-none",
    })
  ),
  {
    variants: {
      variant: {
        default: cn(
          'bg-primary',
          Platform.select({ web: '[a&]:hover:bg-primary/90' })
        ),
        secondary: cn(
          'bg-secondary',
          Platform.select({ web: '[a&]:hover:bg-secondary/90' })
        ),
        destructive: cn(
          'bg-destructive',
          Platform.select({ web: '[a&]:hover:bg-destructive/90' })
        ),
        outline: cn(
          'border-input bg-background',
          DARK_INPUT_BG,
          Platform.select({ web: '[a&]:hover:bg-accent/50 dark:[a&]:hover:bg-input/48' })
        ),
        error: 'bg-destructive/8 dark:bg-destructive/16',
        info: 'bg-info/8 dark:bg-info/16',
        success: 'bg-success/8 dark:bg-success/16',
        warning: 'bg-warning/8 dark:bg-warning/16',
      },
      size: {
        default: 'h-5.5 min-w-5.5 px-1',
        sm: 'h-5 min-w-5 rounded px-1',
        lg: 'h-6.5 min-w-6.5 px-1.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const badgeTextVariants = cva('font-medium', {
  variants: {
    variant: {
      default: 'text-primary-foreground text-xs',
      secondary: 'text-secondary-foreground text-xs',
      destructive: 'text-white text-xs',
      outline: 'text-foreground text-xs',
      error: 'text-destructive-foreground text-xs',
      info: 'text-info-foreground text-xs',
      success: 'text-success-foreground text-xs',
      warning: 'text-warning-foreground text-xs',
    },
    size: {
      default: 'text-sm sm:text-xs',
      sm: 'text-xs sm:text-[10px]',
      lg: 'text-base sm:text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BadgeProps = React.ComponentProps<typeof View> &
  React.RefAttributes<View> & {
    asChild?: boolean;
  } & VariantProps<typeof badgeVariants>;

function Badge({ className, variant, size, asChild, ...props }: BadgeProps) {
  const Component = asChild ? Slot : View;
  return (
    <TextClassContext.Provider value={badgeTextVariants({ variant, size })}>
      <Component className={cn(badgeVariants({ variant, size }), className)} {...props} />
    </TextClassContext.Provider>
  );
}

export { Badge, badgeTextVariants, badgeVariants };
export type { BadgeProps };
