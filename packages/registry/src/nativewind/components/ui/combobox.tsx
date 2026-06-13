import {
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
} from '@/registry/nativewind/components/ui/autocomplete';
import {
  AutocompleteItemData,
  ComboboxPrimitive,
  useComboboxFilter,
} from '@/registry/nativewind/components/ui/autocomplete-primitive';
import { Badge } from '@/registry/nativewind/components/ui/badge';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { X } from 'lucide-react-native';
import * as React from 'react';
import { Pressable, View } from 'react-native';

export const ComboboxContext = React.createContext<{
  chipsRef: React.RefObject<View | null> | null;
  multiple: boolean;
  selectedValues: string[];
  onToggleValue: (value: string, label: string) => void;
}>({
  chipsRef: null,
  multiple: false,
  selectedValues: [],
  onToggleValue: () => {},
});

function Combobox({
  items,
  value,
  onValueChange,
  multiple = false,
  disabled,
  children,
  className,
  ...props
}: React.ComponentProps<typeof View> & {
  items: AutocompleteItemData[];
  multiple?: boolean;
  value?: string | string[];
  onValueChange?: (value: string | string[] | undefined) => void;
  disabled?: boolean;
}) {
  const chipsRef = React.useRef<View | null>(null);
  const selectedValues = React.useMemo(
    () => (multiple ? (Array.isArray(value) ? value : value ? [value] : []) : []),
    [multiple, value]
  );

  const onToggleValue = React.useCallback(
    (nextValue: string, label: string) => {
      if (!multiple) {
        onValueChange?.(nextValue);
        return;
      }
      const exists = selectedValues.includes(nextValue);
      const next = exists
        ? selectedValues.filter((item) => item !== nextValue)
        : [...selectedValues, nextValue];
      onValueChange?.(next);
    },
    [multiple, onValueChange, selectedValues]
  );

  const singleValue = multiple ? undefined : (typeof value === 'string' ? value : undefined);

  return (
    <ComboboxContext.Provider value={{ chipsRef, multiple, selectedValues, onToggleValue }}>
      <Autocomplete
        items={items}
        value={singleValue}
        onValueChange={(next) => onValueChange?.(next)}
        disabled={disabled}
        className={className}
        {...props}>
        {children}
      </Autocomplete>
    </ComboboxContext.Provider>
  );
}

function ComboboxChipsInput(props: React.ComponentProps<typeof AutocompleteInput>) {
  return <AutocompleteInput {...props} />;
}

function ComboboxInput(props: React.ComponentProps<typeof AutocompleteInput>) {
  return <AutocompleteInput {...props} />;
}

function ComboboxTrigger(props: React.ComponentProps<typeof AutocompleteTrigger>) {
  return <AutocompleteTrigger {...props} />;
}

function ComboboxPopup(props: React.ComponentProps<typeof AutocompletePopup>) {
  return <AutocompletePopup {...props} />;
}

function ComboboxItem(props: React.ComponentProps<typeof AutocompleteItem>) {
  const { multiple, selectedValues, onToggleValue } = React.useContext(ComboboxContext);
  if (!props.item) return <AutocompleteItem {...props} />;
  const selected = multiple ? selectedValues.includes(props.item.value) : false;
  return (
    <AutocompleteItem
      {...props}
      onPress={() => onToggleValue(props.item!.value, props.item!.label)}>
      <View className="flex-row items-center gap-2">
        {multiple ? <View className={cn('size-2 rounded-full', selected && 'bg-primary')} /> : null}
        <Text>{props.item.label}</Text>
      </View>
    </AutocompleteItem>
  );
}

function ComboboxSeparator(props: React.ComponentProps<typeof AutocompleteSeparator>) {
  return <AutocompleteSeparator {...props} />;
}

function ComboboxGroup(props: React.ComponentProps<typeof AutocompleteGroup>) {
  return <AutocompleteGroup {...props} />;
}

function ComboboxGroupLabel(props: React.ComponentProps<typeof AutocompleteGroupLabel>) {
  return <AutocompleteGroupLabel {...props} />;
}

function ComboboxEmpty(props: React.ComponentProps<typeof AutocompleteEmpty>) {
  return <AutocompleteEmpty {...props} />;
}

function ComboboxRow(props: React.ComponentProps<typeof AutocompleteRow>) {
  return <AutocompleteRow {...props} />;
}

function ComboboxValue(props: React.ComponentProps<typeof AutocompleteValue>) {
  return <AutocompleteValue {...props} />;
}

function ComboboxList(props: React.ComponentProps<typeof AutocompleteList>) {
  return <AutocompleteList {...props} />;
}

function ComboboxClear(props: React.ComponentProps<typeof AutocompleteClear>) {
  return <AutocompleteClear {...props} />;
}

function ComboboxStatus(props: React.ComponentProps<typeof AutocompleteStatus>) {
  return <AutocompleteStatus {...props} />;
}

function ComboboxCollection(props: React.ComponentProps<typeof AutocompleteCollection>) {
  return <AutocompleteCollection {...props} />;
}

function ComboboxChips({ className, items, ...props }: React.ComponentProps<typeof View> & { items: AutocompleteItemData[] }) {
  const { chipsRef, selectedValues, onToggleValue } = React.useContext(ComboboxContext);
  return (
    <View ref={chipsRef} className={cn('flex-row flex-wrap gap-1', className)} {...props}>
      {selectedValues.map((value) => {
        const item = items.find((entry) => entry.value === value);
        if (!item) return null;
        return (
          <ComboboxChip key={value} value={value} label={item.label} onRemove={() => onToggleValue(value, item.label)} />
        );
      })}
    </View>
  );
}

function ComboboxChip({
  label,
  onRemove,
  className,
}: {
  value: string;
  label: string;
  onRemove: () => void;
  className?: string;
}) {
  return (
    <Badge variant="secondary" className={cn('flex-row items-center gap-1 pr-1', className)}>
      <Text>{label}</Text>
      <Pressable onPress={onRemove} hitSlop={8}>
        <Icon as={X} className="size-3" />
      </Pressable>
    </Badge>
  );
}

function ComboboxChipRemove({ className, onPress, ...props }: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable className={className} onPress={onPress} {...props}>
      <Icon as={X} className="size-3" />
    </Pressable>
  );
}

export {
  Combobox,
  ComboboxChip,
  ComboboxChipRemove,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxClear,
  ComboboxCollection,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
  ComboboxRow,
  ComboboxSeparator,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxFilter,
};
export { ComboboxPrimitive };
