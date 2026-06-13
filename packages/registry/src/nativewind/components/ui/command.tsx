import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteSeparator,
} from '@/registry/nativewind/components/ui/autocomplete';
import { AutocompleteItemData } from '@/registry/nativewind/components/ui/autocomplete-primitive';
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
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { Search } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

const CommandDialog = Dialog;
const CommandDialogPortal = DialogPortal;
const CommandDialogTrigger = DialogTrigger;
const CommandDialogBackdrop = DialogBackdrop;
const CommandDialogViewport = ({ className, ...props }: React.ComponentProps<typeof View>) => (
  <View className={cn('flex-1 items-center justify-center px-4 py-8', className)} {...props} />
);
const CommandDialogPopup = DialogPopup;

function CommandCreateHandle() {
  return {};
}

function Command({
  items,
  value,
  onValueChange,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Autocomplete>) {
  return (
    <Autocomplete items={items} value={value} onValueChange={onValueChange} className={className} {...props}>
      {children ?? (
        <>
          <CommandInput placeholder="Search..." />
          <CommandList>
            {items.map((item) => (
              <CommandItem key={item.value} item={item} />
            ))}
          </CommandList>
        </>
      )}
    </Autocomplete>
  );
}

function CommandInput({
  className,
  placeholder,
  ...props
}: React.ComponentProps<typeof AutocompleteInput>) {
  return (
    <View className="relative">
      <View className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        <Icon as={Search} className="text-muted-foreground size-4" />
      </View>
      <AutocompleteInput className={cn('pl-10', className)} placeholder={placeholder} {...props} />
    </View>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof AutocompleteList>) {
  return <AutocompleteList className={className} {...props} />;
}

function CommandEmpty(props: React.ComponentProps<typeof AutocompleteEmpty>) {
  return <AutocompleteEmpty {...props} />;
}

function CommandPanel({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-2', className)} {...props} />;
}

function CommandGroup(props: React.ComponentProps<typeof AutocompleteGroup>) {
  return <AutocompleteGroup {...props} />;
}

function CommandGroupLabel(props: React.ComponentProps<typeof AutocompleteGroupLabel>) {
  return <AutocompleteGroupLabel {...props} />;
}

function CommandCollection({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

function CommandItem({
  item,
  className,
  ...props
}: React.ComponentProps<typeof AutocompleteItem> & { item: AutocompleteItemData }) {
  return <AutocompleteItem item={item} className={className} {...props} />;
}

function CommandSeparator(props: React.ComponentProps<typeof AutocompleteSeparator>) {
  return <AutocompleteSeparator {...props} />;
}

function CommandShortcut({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground ms-auto text-xs', className)} {...props} />;
}

function CommandFooter({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('border-border border-t px-3 py-2', className)} {...props} />;
}

export {
  Command,
  CommandCollection,
  CommandDialog,
  CommandDialogBackdrop,
  CommandDialogPopup,
  CommandDialogPortal,
  CommandDialogTrigger,
  CommandDialogViewport,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandSeparator,
  CommandShortcut,
  CommandCreateHandle,
};
export { Dialog as CommandDialogPrimitive };
