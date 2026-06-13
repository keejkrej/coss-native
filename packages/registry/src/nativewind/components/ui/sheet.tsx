import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/registry/nativewind/components/ui/dialog';
import { cn } from '@/registry/nativewind/lib/utils';
import { Platform, View } from 'react-native';

const Sheet = Dialog;
const SheetClose = DialogClose;
const SheetPortal = DialogPortal;
const SheetTrigger = DialogTrigger;
const SheetBackdrop = DialogBackdrop;
const SheetPopup = DialogPopup;
const SheetHeader = DialogHeader;
const SheetFooter = DialogFooter;
const SheetTitle = DialogTitle;
const SheetDescription = DialogDescription;

function SheetViewport({
  className,
  side = 'bottom',
  ...props
}: React.ComponentProps<typeof View> & { side?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <View
      className={cn(
        'flex-1 items-center justify-center',
        side === 'bottom' && 'justify-end',
        side === 'top' && 'justify-start',
        className
      )}
      {...props}
    />
  );
}

function SheetPanel({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-4', className)} {...props} />;
}

function SheetContent({
  className,
  side = 'bottom',
  ...props
}: React.ComponentProps<typeof DialogPopup> & { side?: 'top' | 'bottom' | 'left' | 'right' }) {
  return (
    <DialogPopup
      className={cn(
        Platform.select({
          native:
            side === 'bottom'
              ? 'mt-auto max-w-full rounded-b-none rounded-t-2xl'
              : 'max-w-full',
        }),
        className
      )}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetBackdrop,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  SheetViewport,
};
