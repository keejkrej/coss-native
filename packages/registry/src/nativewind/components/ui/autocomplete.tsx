import {
  AutocompleteContext,
  AutocompleteItemData,
  AutocompletePrimitive,
  useAutocompleteContext,
  useAutocompleteFilter,
} from '@/registry/nativewind/components/ui/autocomplete-primitive';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Input } from '@/registry/nativewind/components/ui/input';
import { ScrollArea } from '@/registry/nativewind/components/ui/scroll-area';
import { Separator } from '@/registry/nativewind/components/ui/separator';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { ChevronsUpDown, X } from 'lucide-react-native';
import * as React from 'react';
import { FlatList, Platform, Pressable, View } from 'react-native';

function Autocomplete({
  items,
  value,
  onValueChange,
  disabled,
  children,
  className,
  ...props
}: React.ComponentProps<typeof View> & {
  items: AutocompleteItemData[];
  value?: string;
  onValueChange?: (value: string | undefined) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [highlightedIndex, setHighlightedIndex] = React.useState(0);
  const filteredItems = useAutocompleteFilter(items, inputValue);

  React.useEffect(() => {
    if (value) {
      const match = items.find((item) => item.value === value);
      if (match) setInputValue(match.label);
    }
  }, [items, value]);

  const onItemSelect = React.useCallback(
    (item: AutocompleteItemData) => {
      onValueChange?.(item.value);
      setInputValue(item.label);
      setOpen(false);
    },
    [onValueChange]
  );

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      inputValue,
      setInputValue,
      items,
      filteredItems,
      highlightedIndex,
      setHighlightedIndex,
      onItemSelect,
      disabled,
    }),
    [
      open,
      inputValue,
      items,
      filteredItems,
      highlightedIndex,
      onItemSelect,
      disabled,
    ]
  );

  return (
    <AutocompleteContext.Provider value={contextValue}>
      <View className={cn('w-full', className)} {...props}>
        {children}
      </View>
    </AutocompleteContext.Provider>
  );
}

function AutocompleteInput({
  className,
  showTrigger = false,
  showClear = false,
  startAddon,
  size = 'default',
  placeholder,
  ...props
}: Omit<React.ComponentProps<typeof Input>, 'value' | 'onChangeText'> & {
  showTrigger?: boolean;
  showClear?: boolean;
  startAddon?: React.ReactNode;
  size?: 'sm' | 'default' | 'lg';
}) {
  const { inputValue, setInputValue, setOpen, open, disabled, onItemSelect, filteredItems } =
    useAutocompleteContext();

  return (
    <View className="relative w-full">
      {startAddon ? <View className="absolute left-3 top-1/2 z-10 -translate-y-1/2">{startAddon}</View> : null}
      <Input
        className={cn(startAddon && 'pl-10', (showTrigger || showClear) && 'pr-10', className)}
        size={size}
        value={inputValue}
        editable={!disabled}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChangeText={(text) => {
          setInputValue(text);
          setOpen(true);
        }}
        {...props}
      />
      {showClear && inputValue ? (
        <Pressable
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          onPress={() => {
            setInputValue('');
            onItemSelect({ value: '', label: '' });
          }}>
          <Icon as={X} className="text-muted-foreground size-4" />
        </Pressable>
      ) : null}
      {showTrigger ? (
        <Pressable
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
          onPress={() => setOpen(!open)}>
          <Icon as={ChevronsUpDown} className="text-muted-foreground size-4" />
        </Pressable>
      ) : null}
      {open && filteredItems.length === 0 && inputValue ? (
        <View className="absolute top-full z-50 mt-1 w-full rounded-lg border border-border bg-popover p-3 shadow-md">
          <Text className="text-muted-foreground text-sm">No results found.</Text>
        </View>
      ) : null}
    </View>
  );
}

function AutocompletePopup({
  className,
  children,
  ...props
}: React.ComponentProps<typeof View>) {
  const { open } = useAutocompleteContext();
  if (!open) return null;
  return (
    <View
      className={cn(
        'border-border bg-popover absolute top-full z-50 mt-1 w-full overflow-hidden rounded-lg border shadow-md shadow-black/5',
        className
      )}
      {...props}>
      {children}
    </View>
  );
}

function AutocompleteList({
  className,
  ...props
}: React.ComponentProps<typeof ScrollArea>) {
  const { filteredItems, highlightedIndex, onItemSelect, setHighlightedIndex } =
    useAutocompleteContext();

  return (
    <ScrollArea className={cn('max-h-52', className)} {...props}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.value}
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          <AutocompleteItem
            item={item}
            highlighted={index === highlightedIndex}
            onHover={() => setHighlightedIndex(index)}
            onPress={() => onItemSelect(item)}
          />
        )}
      />
    </ScrollArea>
  );
}

function AutocompleteItem({
  item,
  highlighted,
  onHover,
  onPress,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Pressable> & {
  item?: AutocompleteItemData;
  highlighted?: boolean;
  onHover?: () => void;
}) {
  const content = children ?? (item ? <Text>{item.label}</Text> : null);
  return (
    <Pressable
      className={cn(
        'flex-row items-center px-3 py-2',
        highlighted && 'bg-accent',
        Platform.select({ web: 'hover:bg-accent' }),
        className
      )}
      onPress={onPress}
      onPressIn={onHover}
      {...props}>
      {content}
    </Pressable>
  );
}

function AutocompleteSeparator(props: React.ComponentProps<typeof Separator>) {
  return <Separator {...props} />;
}

function AutocompleteGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex flex-col gap-1', className)} {...props} />;
}

function AutocompleteGroupLabel({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground px-3 py-1 text-xs font-medium', className)} {...props} />;
}

function AutocompleteEmpty({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground px-3 py-2 text-sm', className)} {...props} />;
}

function AutocompleteRow({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex-row items-center', className)} {...props} />;
}

function AutocompleteValue({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm', className)} {...props} />;
}

function AutocompleteClear({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  const { setInputValue, onItemSelect } = useAutocompleteContext();
  return (
    <Pressable
      className={cn('absolute right-2 top-1/2 -translate-y-1/2 p-1', className)}
      onPress={() => {
        setInputValue('');
        onItemSelect({ value: '', label: '' });
      }}
      {...props}>
      <Icon as={X} className="text-muted-foreground size-4" />
    </Pressable>
  );
}

function AutocompleteStatus({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground px-3 py-2 text-sm', className)} {...props} />;
}

function AutocompleteCollection({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

function AutocompleteTrigger({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  const { setOpen, open } = useAutocompleteContext();
  return (
    <Pressable className={className} onPress={() => setOpen(!open)} {...props}>
      <Icon as={ChevronsUpDown} className="text-muted-foreground size-4" />
    </Pressable>
  );
}

export {
  Autocomplete,
  AutocompleteClear,
  AutocompleteCollection,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
  AutocompleteRow,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
  AutocompleteValue,
  useAutocompleteFilter,
};
export { AutocompletePrimitive };
