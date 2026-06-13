import { Input } from '@/registry/nativewind/components/ui/input';
import { Text } from '@/registry/nativewind/components/ui/text';
import { Textarea } from '@/registry/nativewind/components/ui/textarea';
import { cn, DARK_INPUT_BG, SURFACE_SHADOW } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const inputGroupAddonVariants = cva('text-muted-foreground flex flex-row items-center', {
  defaultVariants: {
    align: 'inline-start',
  },
  variants: {
    align: {
      'block-end': 'order-last w-full justify-start px-3 pb-3',
      'block-start': 'order-first w-full justify-start px-3 pt-3',
      'inline-end': 'order-last pe-3',
      'inline-start': 'order-first ps-3',
    },
  },
});

function InputGroup({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      className={cn(
        'border-input bg-background flex w-full flex-row flex-wrap items-center overflow-hidden rounded-lg border',
        SURFACE_SHADOW,
        DARK_INPUT_BG,
        className
      )}
      {...props}
    />
  );
}

function InputGroupAddon({
  align = 'inline-start',
  className,
  ...props
}: React.ComponentProps<typeof View> & VariantProps<typeof inputGroupAddonVariants>) {
  return <View className={cn(inputGroupAddonVariants({ align }), className)} {...props} />;
}

function InputGroupText({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

function InputGroupInput({ className, unstyled = true, ...props }: React.ComponentProps<typeof Input>) {
  return <Input unstyled className={cn('min-w-0 flex-1 border-0', className)} {...props} />;
}

function InputGroupTextarea({
  className,
  unstyled = true,
  ...props
}: React.ComponentProps<typeof Textarea>) {
  return <Textarea unstyled className={cn('min-h-20 min-w-0 flex-1 border-0', className)} {...props} />;
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
  inputGroupAddonVariants,
};
