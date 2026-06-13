import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { ChevronRight, MoreHorizontal } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';

function Breadcrumb({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View accessibilityRole="none" className={cn(className)} {...props} />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex-row flex-wrap items-center gap-1.5', className)} {...props} />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex-row items-center gap-1.5', className)} {...props} />;
}

function BreadcrumbLink({
  className,
  ...props
}: React.ComponentProps<typeof Pressable>) {
  return (
    <Pressable
      className={cn(
        'active:opacity-70',
        Platform.select({ web: 'hover:opacity-80' }),
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-foreground font-normal', className)} {...props} />;
}

function BreadcrumbSeparator({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex-row items-center', className)} {...props}>
      <Icon as={ChevronRight} className="text-muted-foreground size-3.5" />
    </View>
  );
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex size-9 items-center justify-center', className)} {...props}>
      <Icon as={MoreHorizontal} className="text-foreground size-4" />
    </View>
  );
}

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
