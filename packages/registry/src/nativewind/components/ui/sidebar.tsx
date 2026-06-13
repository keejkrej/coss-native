import { Button } from '@/registry/nativewind/components/ui/button';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Input } from '@/registry/nativewind/components/ui/input';
import { ScrollArea } from '@/registry/nativewind/components/ui/scroll-area';
import { Separator } from '@/registry/nativewind/components/ui/separator';
import {
  Sheet,
  SheetContent,
} from '@/registry/nativewind/components/ui/sheet';
import { Skeleton } from '@/registry/nativewind/components/ui/skeleton';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cva, type VariantProps } from 'class-variance-authority';
import { PanelLeft } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, useWindowDimensions, View } from 'react-native';

const SIDEBAR_STORAGE_KEY = 'coss_sidebar_state';
const SIDEBAR_WIDTH = 256;

const sidebarMenuButtonVariants = cva(
  'flex w-full flex-row items-center gap-2 overflow-hidden rounded-lg p-2',
  {
    variants: {
      variant: {
        default: 'active:bg-sidebar-accent',
        outline: 'border border-sidebar-border bg-background',
      },
      size: {
        default: 'h-8',
        sm: 'h-7',
        lg: 'h-12',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

export const SidebarContext = React.createContext<SidebarContextProps | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  className,
  children,
  ...props
}: React.ComponentProps<typeof View> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const [openMobile, setOpenMobile] = React.useState(false);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    AsyncStorage.getItem(SIDEBAR_STORAGE_KEY).then((value) => {
      if (value != null && openProp === undefined) {
        setUncontrolledOpen(value === 'true');
      }
    });
  }, [openProp]);

  const open = openProp ?? uncontrolledOpen;
  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === 'function' ? value(open) : value;
      onOpenChange?.(next);
      if (openProp === undefined) {
        setUncontrolledOpen(next);
      }
      AsyncStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
    },
    [onOpenChange, open, openProp]
  );

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((current) => !current);
      return;
    }
    setOpen((current) => !current);
  }, [isMobile, setOpen]);

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state: open ? 'expanded' : 'collapsed',
      open,
      setOpen,
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
    }),
    [open, setOpen, openMobile, isMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <View className={cn('flex-1 flex-row', className)} {...props}>
        {children}
      </View>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  className,
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  children,
  ...props
}: React.ComponentProps<typeof View> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) {
  const { isMobile, open, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side={side === 'right' ? 'right' : 'bottom'} className="w-full max-w-sm p-0">
          <View className={cn('bg-sidebar flex h-full flex-col', className)} {...props}>
            {children}
          </View>
        </SheetContent>
      </Sheet>
    );
  }

  if (collapsible !== 'none' && !open) {
    return null;
  }

  return (
    <View
      className={cn(
        'bg-sidebar border-sidebar-border h-full border-r',
        variant === 'floating' && 'm-2 rounded-xl border shadow-sm',
        variant === 'inset' && 'm-2 rounded-xl',
        className
      )}
      style={{ width: collapsible === 'icon' ? 48 : SIDEBAR_WIDTH }}
      {...props}>
      {children}
    </View>
  );
}

function SidebarTrigger({ className, ...props }: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button variant="ghost" size="icon" className={className} onPress={toggleSidebar} {...props}>
      <Icon as={PanelLeft} className="size-4" />
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  const { toggleSidebar } = useSidebar();
  return <Pressable className={cn('absolute inset-y-0 -right-2 w-2', className)} onPress={toggleSidebar} {...props} />;
}

function SidebarInset({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('bg-background flex-1', className)} {...props} />;
}

function SidebarInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return <Input className={cn('bg-background', className)} {...props} />;
}

function SidebarHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

function SidebarFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-2 p-2', className)} {...props} />;
}

function SidebarSeparator(props: React.ComponentProps<typeof Separator>) {
  return <Separator {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<typeof ScrollArea>) {
  return <ScrollArea className={cn('flex-1 px-2', className)} {...props} />;
}

function SidebarGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('relative flex w-full min-w-0 flex-col p-2', className)} {...props} />;
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sidebar-foreground/70 px-2 text-xs font-medium', className)} {...props} />;
}

function SidebarGroupAction({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  return <Pressable className={cn('absolute right-3 top-3', className)} {...props} />;
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('w-full text-sm', className)} {...props} />;
}

function SidebarMenu({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex w-full min-w-0 flex-col gap-1', className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('group/menu-item relative', className)} {...props} />;
}

function SidebarMenuButton({
  className,
  variant,
  size,
  isActive,
  children,
  ...props
}: React.ComponentProps<typeof Pressable> &
  VariantProps<typeof sidebarMenuButtonVariants> & { isActive?: boolean }) {
  return (
    <Pressable
      className={cn(
        sidebarMenuButtonVariants({ variant, size }),
        isActive && 'bg-sidebar-accent',
        Platform.select({ web: 'hover:bg-sidebar-accent' }),
        className
      )}
      {...props}>
      {children}
    </Pressable>
  );
}

function SidebarMenuAction({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  return <Pressable className={cn('absolute right-1 top-1', className)} {...props} />;
}

function SidebarMenuBadge({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn(
        'text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums',
        className
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex h-8 flex-row items-center gap-2 px-2', className)} {...props}>
      <Skeleton className="size-4 rounded-md" />
      <Skeleton className="h-4 max-w-[--skeleton-width] flex-1" />
    </View>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5', className)} {...props} />;
}

function SidebarMenuSubItem({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

function SidebarMenuSubButton({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      className={cn(
        'text-sidebar-foreground active:bg-sidebar-accent flex h-7 min-w-0 -translate-x-px flex-row items-center gap-2 overflow-hidden rounded-md px-2',
        className
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  sidebarMenuButtonVariants,
};
