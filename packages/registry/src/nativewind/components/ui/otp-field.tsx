import { Separator } from '@/registry/nativewind/components/ui/separator';
import { cn } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, TextInput, View } from 'react-native';

type OTPFieldContextValue = {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  disabled?: boolean;
  size: 'default' | 'lg';
};

const OTPFieldContext = React.createContext<OTPFieldContextValue | null>(null);

function useOTPField() {
  const context = React.useContext(OTPFieldContext);
  if (!context) {
    throw new Error('OTPField components must be used within OTPField.');
  }
  return context;
}

const otpCellVariants = cva(
  'border-input bg-background rounded-lg border text-center text-foreground shadow-sm shadow-black/5',
  {
    variants: {
      size: {
        default: 'size-9 text-base leading-9 sm:size-8 sm:text-sm sm:leading-8',
        lg: 'size-10 text-lg leading-10 sm:size-9 sm:text-base sm:leading-9',
      },
    },
    defaultVariants: { size: 'default' },
  }
);

function OTPField({
  className,
  value,
  onChange,
  maxLength = 6,
  disabled,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof View> & {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  disabled?: boolean;
  size?: 'default' | 'lg';
}) {
  const contextValue = React.useMemo(
    () => ({ value, onChange, maxLength, disabled, size }),
    [value, onChange, maxLength, disabled, size]
  );

  return (
    <OTPFieldContext.Provider value={contextValue}>
      <View
        className={cn('flex-row items-center gap-2', disabled && 'opacity-60', className)}
        {...props}>
        {children}
      </View>
    </OTPFieldContext.Provider>
  );
}

function OTPFieldInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TextInput>, 'value' | 'onChangeText' | 'maxLength'>) {
  const { value, onChange, maxLength, disabled, size } = useOTPField();
  const inputRefs = React.useRef<Array<TextInput | null>>([]);
  const cells = Array.from({ length: maxLength }, (_, index) => value[index] ?? '');

  const focusCell = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const updateValue = (next: string) => {
    onChange(next.slice(0, maxLength));
  };

  const handleChange = (index: number, text: string) => {
    const digit = text.replace(/\D/g, '');
    if (digit.length > 1) {
      const pasted = (value.slice(0, index) + digit + value.slice(index + digit.length)).slice(
        0,
        maxLength
      );
      updateValue(pasted);
      focusCell(Math.min(pasted.length, maxLength - 1));
      return;
    }

    const next = value.slice(0, index) + digit + value.slice(index + 1);
    updateValue(next);
    if (digit && index < maxLength - 1) {
      focusCell(index + 1);
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !cells[index] && index > 0) {
      const next = value.slice(0, index - 1) + value.slice(index);
      updateValue(next);
      focusCell(index - 1);
    }
  };

  return (
    <View className={cn('flex-row items-center gap-2', className)}>
      {cells.map((cell, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputRefs.current[index] = ref;
          }}
          className={cn(otpCellVariants({ size }), Platform.select({ web: 'outline-none' }))}
          value={cell}
          editable={!disabled}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus
          textContentType="oneTimeCode"
          autoComplete={Platform.OS === 'web' ? 'one-time-code' : 'sms-otp'}
          onChangeText={(text) => handleChange(index, text)}
          onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          {...props}
        />
      ))}
    </View>
  );
}

function OTPFieldSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn('bg-input h-0.5 w-3 rounded-full', className)}
      orientation="horizontal"
      {...props}
    />
  );
}

const OTPFieldPrimitive = {
  Root: OTPField,
  Input: OTPFieldInput,
  Separator: OTPFieldSeparator,
};

export { OTPField, OTPFieldInput, OTPFieldSeparator, OTPFieldPrimitive, useOTPField };
