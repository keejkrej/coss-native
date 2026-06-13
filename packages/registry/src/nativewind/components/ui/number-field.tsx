import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Label } from '@/registry/nativewind/components/ui/label';
import { cn, DARK_INPUT_BG, DISABLED_OPACITY, SURFACE_SHADOW } from '@/registry/nativewind/lib/utils';
import { Minus, Plus } from 'lucide-react-native';
import * as React from 'react';
import { Platform, Pressable, TextInput, View } from 'react-native';

type NumberFieldContextValue = {
  fieldId: string;
  value: number | null;
  onValueChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step: number;
  disabled?: boolean;
  size: 'sm' | 'default' | 'lg';
};

export const NumberFieldContext = React.createContext<NumberFieldContextValue | null>(null);

function useNumberField() {
  const context = React.useContext(NumberFieldContext);
  if (!context) {
    throw new Error('NumberField components must be used within NumberField.');
  }
  return context;
}

function clampValue(value: number, min?: number, max?: number) {
  let next = value;
  if (min != null) next = Math.max(min, next);
  if (max != null) next = Math.min(max, next);
  return next;
}

function NumberField({
  id,
  className,
  value,
  defaultValue,
  onValueChange,
  min,
  max,
  step = 1,
  disabled,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof View> & {
  id?: string;
  value?: number | null;
  defaultValue?: number | null;
  onValueChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: 'sm' | 'default' | 'lg';
}) {
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const [uncontrolled, setUncontrolled] = React.useState<number | null>(defaultValue ?? null);
  const currentValue = value !== undefined ? value : uncontrolled;

  const setValue = React.useCallback(
    (next: number | null) => {
      if (value === undefined) {
        setUncontrolled(next);
      }
      onValueChange?.(next);
    },
    [onValueChange, value]
  );

  const contextValue = React.useMemo(
    () => ({
      fieldId,
      value: currentValue,
      onValueChange: setValue,
      min,
      max,
      step,
      disabled,
      size,
    }),
    [fieldId, currentValue, setValue, min, max, step, disabled, size]
  );

  return (
    <NumberFieldContext.Provider value={contextValue}>
      <View className={cn('w-full flex-col items-start gap-2', className)} {...props}>
        {children}
      </View>
    </NumberFieldContext.Provider>
  );
}

function NumberFieldGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  const { size, disabled } = useNumberField();
  return (
    <View
      className={cn(
        'border-input bg-background relative w-full flex-row items-center justify-between rounded-lg border',
        SURFACE_SHADOW,
        DARK_INPUT_BG,
        disabled && cn('pointer-events-none', DISABLED_OPACITY),
        size === 'sm' && 'h-7',
        size === 'default' && 'h-9',
        size === 'lg' && 'h-10',
        className
      )}
      {...props}
    />
  );
}

function NumberFieldDecrement({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  const { value, onValueChange, min, step, disabled } = useNumberField();
  return (
    <Pressable
      className={cn(
        'active:bg-accent shrink-0 items-center justify-center rounded-s-lg px-3',
        Platform.select({ web: 'hover:bg-accent' }),
        className
      )}
      disabled={disabled || (value != null && min != null && value <= min)}
      onPress={() => {
        const base = value ?? min ?? 0;
        onValueChange(clampValue(base - step, min, undefined));
      }}
      {...props}>
      <Icon as={Minus} className="size-4" />
    </Pressable>
  );
}

function NumberFieldIncrement({ className, ...props }: React.ComponentProps<typeof Pressable>) {
  const { value, onValueChange, min, max, step, disabled } = useNumberField();
  return (
    <Pressable
      className={cn(
        'active:bg-accent shrink-0 items-center justify-center rounded-e-lg px-3',
        Platform.select({ web: 'hover:bg-accent' }),
        className
      )}
      disabled={disabled || (value != null && max != null && value >= max)}
      onPress={() => {
        const base = value ?? min ?? 0;
        onValueChange(clampValue(base + step, undefined, max));
      }}
      {...props}>
      <Icon as={Plus} className="size-4" />
    </Pressable>
  );
}

function NumberFieldInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChangeText'>) {
  const { fieldId, value, onValueChange, min, max, disabled, size } = useNumberField();
  return (
    <TextInput
      nativeID={fieldId}
      className={cn(
        'min-w-0 grow bg-transparent text-center tabular-nums outline-none',
        size === 'sm' && 'h-7 px-2 text-sm leading-7',
        size === 'default' && 'h-9 px-3 text-base leading-9 sm:h-7 sm:text-sm sm:leading-7',
        size === 'lg' && 'h-10 px-3 text-base leading-10 sm:h-8 sm:leading-8',
        className
      )}
      editable={!disabled}
      keyboardType="numeric"
      value={value == null ? '' : String(value)}
      onChangeText={(text) => {
        if (text === '') {
          onValueChange(null);
          return;
        }
        const parsed = Number(text);
        if (Number.isNaN(parsed)) return;
        onValueChange(clampValue(parsed, min, max));
      }}
      {...props}
    />
  );
}

function NumberFieldScrubArea({
  className,
  label,
  children,
  ...props
}: React.ComponentProps<typeof View> & { label: string }) {
  const context = React.useContext(NumberFieldContext);
  if (!context) {
    throw new Error('NumberFieldScrubArea must be used within a NumberField component.');
  }

  return (
    <View className={cn('flex-row items-center gap-2', className)} {...props}>
      <Label>{label}</Label>
      {children}
    </View>
  );
}

function CursorGrowIcon(props: React.ComponentProps<typeof View>) {
  return <View className="size-4 rounded-sm bg-foreground/20" {...props} />;
}

const NumberFieldPrimitive = {
  Root: NumberField,
  Group: NumberFieldGroup,
  Decrement: NumberFieldDecrement,
  Increment: NumberFieldIncrement,
  Input: NumberFieldInput,
  ScrubArea: NumberFieldScrubArea,
};

export {
  CursorGrowIcon,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldPrimitive,
  NumberFieldScrubArea,
  useNumberField,
};
