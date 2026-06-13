import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuTrigger,
} from '@/registry/nativewind/components/ui/menu';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import * as React from 'react';
import { Platform, Pressable, View } from 'react-native';
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/registry/nativewind/components/ui/dialog';

type DrawerPosition = 'right' | 'left' | 'top' | 'bottom';

type DrawerContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: DrawerPosition;
  sheetRef: React.RefObject<BottomSheetModal | null>;
};

const DrawerContext = React.createContext<DrawerContextValue | null>(null);

function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error('Drawer components must be used within Drawer.');
  }
  return context;
}

function DrawerCreateHandle() {
  return {};
}

function NativeDrawerBackdrop(props: React.ComponentProps<typeof BottomSheetBackdrop>) {
  return <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} {...props} />;
}

function Drawer({
  open: openProp,
  onOpenChange,
  defaultOpen = false,
  position = 'bottom',
  children,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  position?: DrawerPosition;
  children?: React.ReactNode;
}) {
  const sheetRef = React.useRef<BottomSheetModal>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (openProp === undefined) {
        setUncontrolledOpen(next);
      }
      if (Platform.OS === 'web') return;
      if (next) {
        sheetRef.current?.present();
      } else {
        sheetRef.current?.dismiss();
      }
    },
    [onOpenChange, openProp]
  );

  React.useEffect(() => {
    if (Platform.OS === 'web') return;
    if (open) sheetRef.current?.present();
    else sheetRef.current?.dismiss();
  }, [open]);

  const contextValue = React.useMemo(
    () => ({ open, setOpen, position, sheetRef }),
    [open, setOpen, position]
  );

  if (Platform.OS === 'web') {
    return (
      <DrawerContext.Provider value={contextValue}>
        <Dialog open={open} onOpenChange={setOpen}>
          {children}
        </Dialog>
      </DrawerContext.Provider>
    );
  }

  return (
    <DrawerContext.Provider value={contextValue}>
      <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
    </DrawerContext.Provider>
  );
}

const DrawerPortal = ({ children }: { children?: React.ReactNode }) => <>{children}</>;

function DrawerTrigger({ children, ...props }: React.ComponentProps<typeof DialogTrigger>) {
  const { setOpen } = useDrawer();
  if (Platform.OS === 'web') {
    return <DialogTrigger {...props}>{children}</DialogTrigger>;
  }
  return (
    <Pressable onPress={() => setOpen(true)} {...props}>
      {children}
    </Pressable>
  );
}

function DrawerClose({ children, ...props }: React.ComponentProps<typeof DialogClose>) {
  const { setOpen } = useDrawer();
  if (Platform.OS === 'web') {
    return <DialogClose {...props}>{children}</DialogClose>;
  }
  return (
    <Pressable onPress={() => setOpen(false)} {...props}>
      {children}
    </Pressable>
  );
}

function DrawerSwipeArea({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('h-2 w-full', className)} {...props} />;
}

function DrawerBackdrop(props: React.ComponentProps<typeof DialogBackdrop>) {
  return <DialogBackdrop {...props} />;
}

function DrawerViewport({ className, children, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex-1 items-center justify-end', className)} {...props}>
      {children}
    </View>
  );
}

function DrawerPopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const { sheetRef, setOpen, position } = useDrawer();

  if (Platform.OS === 'web') {
    return (
      <DialogPortal>
        <DialogBackdrop />
        <DrawerViewport>
          <DialogPopup className={cn('mt-auto w-full max-w-full rounded-t-2xl', className)}>
            {children}
          </DialogPopup>
        </DrawerViewport>
      </DialogPortal>
    );
  }

  return (
    <BottomSheetModal
      ref={sheetRef}
      index={0}
      snapPoints={position === 'bottom' ? ['50%', '85%'] : ['85%']}
      onDismiss={() => setOpen(false)}
      backdropComponent={NativeDrawerBackdrop}
      enablePanDownToClose>
      <BottomSheetScrollView className={cn('bg-background px-4 pb-8', className)} {...props}>
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-1.5 pb-4', className)} {...props} />;
}

function DrawerFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-2 pt-4', className)} {...props} />;
}

function DrawerTitle({ className, ...props }: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle className={className} {...props} />;
}

function DrawerDescription({ className, ...props }: React.ComponentProps<typeof DialogDescription>) {
  return <DialogDescription className={className} {...props} />;
}

function DrawerPanel({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-4', className)} {...props} />;
}

function DrawerBar({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('bg-muted mx-auto mb-4 h-1.5 w-12 rounded-full', className)} {...props} />;
}

const DrawerContent = BottomSheetView;

function DrawerMenu(props: React.ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

function DrawerMenuItem(props: React.ComponentProps<typeof MenuItem>) {
  return <MenuItem {...props} />;
}

function DrawerMenuSeparator(props: React.ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator {...props} />;
}

function DrawerMenuGroup(props: React.ComponentProps<typeof MenuGroup>) {
  return <MenuGroup {...props} />;
}

function DrawerMenuGroupLabel(props: React.ComponentProps<typeof MenuGroupLabel>) {
  return <MenuGroupLabel {...props} />;
}

function DrawerMenuTrigger(props: React.ComponentProps<typeof MenuTrigger>) {
  return <MenuTrigger {...props} />;
}

function DrawerMenuCheckboxItem(props: React.ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props} />;
}

function DrawerMenuRadioGroup(props: React.ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup {...props} />;
}

function DrawerMenuRadioItem(props: React.ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props} />;
}

const DrawerPrimitive = {
  Root: Drawer,
  Portal: DrawerPortal,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Backdrop: DrawerBackdrop,
  Viewport: DrawerViewport,
  Popup: DrawerPopup,
  Content: DrawerContent,
};

export {
  Drawer,
  DrawerBackdrop,
  DrawerBar,
  DrawerClose,
  DrawerContent,
  DrawerCreateHandle,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenu,
  DrawerMenuCheckboxItem,
  DrawerMenuGroup,
  DrawerMenuGroupLabel,
  DrawerMenuItem,
  DrawerMenuRadioGroup,
  DrawerMenuRadioItem,
  DrawerMenuSeparator,
  DrawerMenuTrigger,
  DrawerPanel,
  DrawerPopup,
  DrawerPortal,
  DrawerPrimitive,
  DrawerSwipeArea,
  DrawerTitle,
  DrawerTrigger,
  DrawerViewport,
};
