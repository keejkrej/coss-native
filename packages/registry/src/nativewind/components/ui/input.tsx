import {
  cn,
  DARK_INPUT_BG,
  DISABLED_OPACITY,
  SURFACE_SHADOW,
} from '@/registry/nativewind/lib/utils';
import { Platform, TextInput, View } from 'react-native';

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> & {
  size?: 'sm' | 'default' | 'lg';
  unstyled?: boolean;
};

function Input({ className, size = 'default', unstyled = false, ...props }: InputProps) {
  const inputClassName = cn(
    'w-full min-w-0 rounded-[inherit] px-3 outline-none placeholder:text-muted-foreground/72',
    size === 'sm' && 'h-7 text-sm',
    size === 'default' && 'h-[34px] text-base sm:text-sm',
    size === 'lg' && 'h-10 text-base',
    props.editable === false &&
      cn(DISABLED_OPACITY, Platform.select({ web: 'disabled:pointer-events-none' })),
    Platform.select({
      web: cn(
        'selection:bg-primary selection:text-primary-foreground transition-shadow',
        'focus-visible:outline-none aria-invalid:border-destructive/36',
        'focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48'
      ),
    }),
    className
  );

  if (unstyled) {
    return <TextInput className={inputClassName} {...props} />;
  }

  return (
    <View
      className={cn(
        'border-input bg-background w-full rounded-lg border',
        SURFACE_SHADOW,
        DARK_INPUT_BG,
        Platform.select({
          web: cn(
            'focus-within:border-ring focus-within:ring-ring/25 focus-within:ring-[3px]',
            'focus-within:aria-invalid:border-destructive/64 focus-within:aria-invalid:ring-destructive/16',
            'aria-invalid:border-destructive/36'
          ),
        }),
        size === 'sm' && 'h-7',
        size === 'default' && 'h-9',
        size === 'lg' && 'h-10'
      )}>
      <TextInput className={inputClassName} {...props} />
    </View>
  );
}

export { Input };
export type { InputProps };
