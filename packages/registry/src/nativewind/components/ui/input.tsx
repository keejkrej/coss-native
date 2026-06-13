import { cn } from '@/registry/nativewind/lib/utils';
import { Platform, TextInput, View } from 'react-native';

type InputProps = React.ComponentPropsWithoutRef<typeof TextInput> & {
    size?: 'sm' | 'default' | 'lg';
    unstyled?: boolean;
  };

function Input({ className, size = 'default', unstyled = false, ...props }: InputProps) {
  const inputClassName = cn(
    'w-full min-w-0 rounded-[inherit] px-3 outline-none placeholder:text-muted-foreground/72',
    size === 'sm' && 'h-7 text-sm',
    size === 'default' && 'h-9 text-base sm:text-sm',
    size === 'lg' && 'h-10 text-base',
    props.editable === false &&
      cn('opacity-50', Platform.select({ web: 'disabled:pointer-events-none' })),
    Platform.select({
      web: cn(
        'selection:bg-primary selection:text-primary-foreground transition-shadow',
        'focus-visible:outline-none'
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
        'border-input bg-background w-full rounded-lg border shadow-sm shadow-black/5',
        'dark:bg-input/30',
        Platform.select({
          web: 'focus-within:border-ring focus-within:ring-ring/25 focus-within:ring-[3px]',
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
