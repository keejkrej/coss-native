import { TextClassContext } from '@/registry/nativewind/components/ui/text';
import { cn, DISABLED_OPACITY, SURFACE_SHADOW } from '@/registry/nativewind/lib/utils';
import * as TabsPrimitive from '@rn-primitives/tabs';
import * as React from 'react';
import { Platform } from 'react-native';

type TabsVariant = 'default' | 'underline';

const TabsListVariantContext = React.createContext<TabsVariant>('default');

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return <TabsPrimitive.Root className={cn('flex flex-col gap-2', className)} {...props} />;
}

function TabsList({
  variant = 'default',
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & { variant?: TabsVariant }) {
  return (
    <TabsListVariantContext.Provider value={variant}>
      <TabsPrimitive.List
        className={cn(
          'relative flex flex-row items-center justify-center gap-x-0.5 text-muted-foreground',
          variant === 'default'
            ? 'bg-muted text-muted-foreground/72 h-9 rounded-lg p-0.5'
            : 'border-border border-b py-1',
          Platform.select({ web: 'inline-flex w-fit', native: variant === 'default' ? 'mr-auto' : 'w-full' }),
          className
        )}
        {...props}
      />
    </TabsListVariantContext.Provider>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { value } = TabsPrimitive.useRootContext();
  const variant = React.useContext(TabsListVariantContext);
  const isActive = value === props.value;

  return (
    <TextClassContext.Provider
      value={cn(
        'text-muted-foreground text-sm font-medium',
        isActive && 'text-foreground'
      )}>
      <TabsPrimitive.Trigger
        className={cn(
          'flex h-9 flex-row items-center justify-center gap-1.5 px-2.5 py-1',
          variant === 'default' ? 'rounded-md border border-transparent' : 'rounded-none border-b-2 border-transparent',
          Platform.select({
            web: 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring inline-flex cursor-default whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-1 focus-visible:ring-[3px] disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0',
          }),
          props.disabled && DISABLED_OPACITY,
          variant === 'default' && isActive && cn('bg-background', SURFACE_SHADOW, 'dark:bg-input'),
          variant === 'underline' && isActive && 'border-primary',
          variant === 'underline' &&
            Platform.select({ web: 'hover:bg-accent', native: 'active:bg-accent/50' }),
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      className={cn(Platform.select({ web: 'flex-1 outline-none' }), className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
export type { TabsVariant };
export { TabsTrigger as TabsTab, TabsContent as TabsPanel };
