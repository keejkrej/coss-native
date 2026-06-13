import { Icon } from '@/registry/nativewind/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/registry/nativewind/components/ui/native-only-animated-view';
import { TextClassContext } from '@/registry/nativewind/components/ui/text';
import {
  cn,
  DARK_INPUT_BG,
  DISABLED_OPACITY,
  ELEVATED_SHADOW,
  SURFACE_SHADOW,
} from '@/registry/nativewind/lib/utils';
import * as SelectPrimitive from '@rn-primitives/select';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, ChevronDown, ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import * as React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;

const selectTriggerVariants = cva(
  cn(
    'border-input bg-background flex min-h-9 w-full min-w-36 flex-row items-center justify-between gap-2 rounded-lg border px-3 text-base text-foreground',
    SURFACE_SHADOW,
    DARK_INPUT_BG,
    Platform.select({
      web: cn(
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/25 whitespace-nowrap text-sm outline-none',
        'aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/16',
        'dark:aria-invalid:ring-destructive/24 disabled:cursor-not-allowed',
        "[&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
      ),
    })
  ),
  {
    variants: {
      size: {
        default: 'min-h-9 sm:min-h-8',
        lg: 'min-h-10 sm:min-h-9',
        sm: 'min-h-8 gap-1.5 px-2.5 sm:min-h-7',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const selectTriggerIconClassName = 'text-muted-foreground size-4.5 opacity-80 sm:size-4';

function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value> & {
  className?: string;
}) {
  const { value } = SelectPrimitive.useRootContext();
  return (
    <SelectPrimitive.Value
      className={cn(
        'text-foreground line-clamp-1 flex flex-1 flex-row items-center gap-2 text-sm',
        !value && 'text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

function SelectTrigger({
  className,
  children,
  size = 'default',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> &
  VariantProps<typeof selectTriggerVariants> & {
    children?: React.ReactNode;
  }) {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        selectTriggerVariants({ size }),
        props.disabled && DISABLED_OPACITY,
        className
      )}
      {...props}>
      <>{children}</>
      <Icon as={ChevronDown} aria-hidden={true} className={selectTriggerIconClassName} />
    </SelectPrimitive.Trigger>
  );
}

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function SelectContent({
  className,
  children,
  position = 'popper',
  portalHost,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  className?: string;
  portalHost?: string;
}) {
  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
          <TextClassContext.Provider value="text-popover-foreground">
            <NativeOnlyAnimatedView className="z-50" entering={FadeIn} exiting={FadeOut}>
              <SelectPrimitive.Content
                className={cn(
                  'bg-popover border-border relative z-50 min-w-[8rem] rounded-lg border',
                  ELEVATED_SHADOW,
                  Platform.select({
                    web: cn(
                      'animate-in fade-in-0 zoom-in-95 max-h-52 overflow-y-auto overflow-x-hidden',
                      props.side === 'bottom' && 'slide-in-from-top-2',
                      props.side === 'top' && 'slide-in-from-bottom-2'
                    ),
                    native: 'p-1',
                  }),
                  position === 'popper' &&
                    Platform.select({
                      web: cn(
                        props.side === 'bottom' && 'translate-y-1',
                        props.side === 'top' && '-translate-y-1'
                      ),
                    }),
                  className
                )}
                position={position}
                {...props}>
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport
                  className={cn(
                    'p-1',
                    position === 'popper' &&
                      cn(
                        'w-full',
                        Platform.select({
                          web: 'h-[var(--radix-select-trigger-height)] min-w-[var(--radix-select-trigger-width)]',
                        })
                      )
                  )}>
                  {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
              </SelectPrimitive.Content>
            </NativeOnlyAnimatedView>
          </TextClassContext.Provider>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn('text-muted-foreground px-2 py-2 text-xs sm:py-1.5', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        'active:bg-accent group relative flex min-h-8 w-full flex-row items-center gap-2 rounded-sm py-2 pl-2 pr-8 sm:min-h-7 sm:py-1.5',
        Platform.select({
          web: 'focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none [&_svg]:pointer-events-none',
        }),
        props.disabled && DISABLED_OPACITY,
        className
      )}
      {...props}>
      <View className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Icon as={Check} className="text-muted-foreground size-4 shrink-0" />
        </SelectPrimitive.ItemIndicator>
      </View>
      <SelectPrimitive.ItemText className="text-foreground group-active:text-accent-foreground select-none text-sm" />
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        'bg-border -mx-1 my-1 h-px',
        Platform.select({ web: 'pointer-events-none' }),
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <Icon as={ChevronUpIcon} className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  if (Platform.OS !== 'web') {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}>
      <Icon as={ChevronDownIcon} className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerIconClassName,
  selectTriggerVariants,
  type Option,
};
