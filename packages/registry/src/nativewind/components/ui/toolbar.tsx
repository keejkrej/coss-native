import { cn, DARK_INPUT_BG } from '@/registry/nativewind/lib/utils';
import * as ToolbarPrimitive from '@rn-primitives/toolbar';
import { Platform, TextInput, View } from 'react-native';

function Toolbar({ className, ...props }: React.ComponentProps<typeof ToolbarPrimitive.Root>) {
  return (
    <ToolbarPrimitive.Root
      className={cn(
        'bg-card border-border text-card-foreground flex h-10 flex-row items-center gap-1 rounded-xl border p-1',
        Platform.select({ web: 'w-full min-w-max' }),
        className
      )}
      {...props}
    />
  );
}

function ToolbarButton({ className, ...props }: React.ComponentProps<typeof ToolbarPrimitive.Button>) {
  return (
    <ToolbarPrimitive.Button
      className={cn(
        'active:bg-accent flex size-8 items-center justify-center rounded-md',
        Platform.select({ web: 'hover:bg-accent' }),
        className
      )}
      {...props}
    />
  );
}

function ToolbarLink({ className, ...props }: React.ComponentProps<typeof ToolbarPrimitive.Link>) {
  return (
    <ToolbarPrimitive.Link
      className={cn('text-foreground px-2 text-sm font-medium', className)}
      {...props}
    />
  );
}

function ToolbarInput({ className, ...props }: React.ComponentProps<typeof TextInput>) {
  return (
    <TextInput
      className={cn(
        'border-input bg-background h-8 w-full min-w-0 rounded-md border px-2 text-sm',
        DARK_INPUT_BG,
        className
      )}
      {...props}
    />
  );
}

function ToolbarGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-row items-center gap-1', className)} {...props} />;
}

function ToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.Separator>) {
  return <ToolbarPrimitive.Separator className={cn('bg-border mx-1 h-6 w-px', className)} {...props} />;
}

function ToolbarToggleGroup({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToggleGroup>) {
  return (
    <ToolbarPrimitive.ToggleGroup className={cn('flex flex-row items-center gap-1', className)} {...props} />
  );
}

function ToolbarToggleItem({
  className,
  ...props
}: React.ComponentProps<typeof ToolbarPrimitive.ToggleItem>) {
  return (
    <ToolbarPrimitive.ToggleItem
      className={cn(
        'active:bg-accent flex size-8 items-center justify-center rounded-md',
        Platform.select({ web: 'hover:bg-accent' }),
        className
      )}
      {...props}
    />
  );
}

export {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarInput,
  ToolbarLink,
  ToolbarSeparator,
  ToolbarToggleGroup,
  ToolbarToggleItem,
};
