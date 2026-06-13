import { Separator } from '@/registry/nativewind/components/ui/separator';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn, DARK_INPUT_BG, SURFACE_SHADOW } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const groupVariants = cva('flex', {
  defaultVariants: { orientation: 'horizontal' },
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-stretch',
    },
  },
});

function Group({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof View> & VariantProps<typeof groupVariants>) {
  return <View className={cn(groupVariants({ orientation }), className)} {...props} />;
}

function GroupText({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn(
        'border-input bg-muted text-muted-foreground rounded-lg border px-3 text-sm',
        SURFACE_SHADOW,
        DARK_INPUT_BG,
        className
      )}
      {...props}
    />
  );
}

function GroupSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator className={className} {...props} />;
}

export { Group, GroupSeparator, GroupText, groupVariants };
export { Group as ButtonGroup, GroupSeparator as ButtonGroupSeparator, GroupText as ButtonGroupText };
