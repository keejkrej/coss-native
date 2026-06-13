import { Separator } from '@/registry/nativewind/components/ui/separator';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { View } from 'react-native';

const groupVariants = cva('flex', {
  variants: {
    orientation: {
      horizontal: 'flex-row items-center',
      vertical: 'flex-col items-stretch',
    },
  },
  defaultVariants: { orientation: 'horizontal' },
});

function Group({
  className,
  orientation,
  ...props
}: React.ComponentProps<typeof View> & VariantProps<typeof groupVariants>) {
  return <View className={cn(groupVariants({ orientation }), className)} {...props} />;
}

function GroupText({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-sm', className)} {...props} />;
}

function GroupSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator className={className} {...props} />;
}

export { Group, GroupSeparator, GroupText, groupVariants };
