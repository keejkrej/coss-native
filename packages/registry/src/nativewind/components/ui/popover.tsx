import { Button } from '@/registry/nativewind/components/ui/button';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { NativeOnlyAnimatedView } from '@/registry/nativewind/components/ui/native-only-animated-view';
import { Text, TextClassContext } from '@/registry/nativewind/components/ui/text';
import { cn, ELEVATED_SHADOW } from '@/registry/nativewind/lib/utils';
import * as PopoverPrimitive from '@rn-primitives/popover';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { FullWindowOverlay as RNFullWindowOverlay } from 'react-native-screens';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const FullWindowOverlay = Platform.OS === 'ios' ? RNFullWindowOverlay : React.Fragment;

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  portalHost,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content> & {
  portalHost?: string;
}) {
  return (
    <PopoverPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <PopoverPrimitive.Overlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
          <NativeOnlyAnimatedView entering={FadeIn.duration(200)} exiting={FadeOut}>
            <TextClassContext.Provider value="text-popover-foreground">
              <PopoverPrimitive.Content
                align={align}
                sideOffset={sideOffset}
                className={cn(
                  'bg-popover border-border text-popover-foreground outline-hidden z-50 w-72 rounded-lg border p-4',
                  ELEVATED_SHADOW,
                  Platform.select({
                    web: cn(
                      'animate-in fade-in-0 zoom-in-95 origin-(--radix-popover-content-transform-origin) cursor-auto',
                      props.side === 'bottom' && 'slide-in-from-top-2',
                      props.side === 'top' && 'slide-in-from-bottom-2'
                    ),
                  }),
                  className
                )}
                {...props}
              />
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </PopoverPrimitive.Overlay>
      </FullWindowOverlay>
    </PopoverPrimitive.Portal>
  );
}

function PopoverClose({
  className,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Close>) {
  return (
    <PopoverPrimitive.Close asChild {...props}>
      <Button variant="ghost" size="icon" className={cn('absolute right-2 top-2', className)}>
        <Icon as={X} className="text-foreground size-4 shrink-0" />
        <Text className="sr-only">Close</Text>
      </Button>
    </PopoverPrimitive.Close>
  );
}

function PopoverTitle({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-foreground text-base font-semibold', className)} {...props} />;
}

function PopoverDescription({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

export { Popover, PopoverClose, PopoverContent, PopoverDescription, PopoverTitle, PopoverTrigger };
export { PopoverContent as PopoverPopup };
