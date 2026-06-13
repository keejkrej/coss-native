import {
  cn,
  DARK_INPUT_BG,
  DISABLED_OPACITY,
  SURFACE_SHADOW,
} from '@/registry/nativewind/lib/utils';
import { Platform, TextInput, View } from 'react-native';

type TextareaProps = React.ComponentProps<typeof TextInput> &
  React.RefAttributes<TextInput> & {
    unstyled?: boolean;
  };

function Textarea({
  className,
  multiline = true,
  numberOfLines = Platform.select({ web: 2, native: 8 }),
  placeholderClassName,
  unstyled = false,
  ...props
}: TextareaProps) {
  const textareaClassName = cn(
    'text-foreground w-full min-w-0 rounded-[inherit] px-3 py-2 text-base outline-none md:text-sm',
    Platform.select({
      web: 'placeholder:text-muted-foreground field-sizing-content resize-y transition-shadow',
    }),
    props.editable === false &&
      cn(DISABLED_OPACITY, Platform.select({ web: 'disabled:cursor-not-allowed' })),
    className
  );

  if (unstyled) {
    return (
      <TextInput
        className={textareaClassName}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        {...props}
      />
    );
  }

  return (
    <View
      className={cn(
        'border-input bg-background w-full rounded-lg border',
        SURFACE_SHADOW,
        DARK_INPUT_BG,
        Platform.select({
          web: cn(
            'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/25',
            'aria-invalid:border-destructive/36 focus-within:aria-invalid:border-destructive/64 focus-within:aria-invalid:ring-destructive/16',
            'dark:aria-invalid:ring-destructive/24'
          ),
        })
      )}>
      <TextInput
        className={textareaClassName}
        placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        {...props}
      />
    </View>
  );
}

export { Textarea };
export type { TextareaProps };
