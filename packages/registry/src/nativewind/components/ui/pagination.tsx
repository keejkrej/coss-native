import { Button, buttonVariants } from '@/registry/nativewind/components/ui/button';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

function Pagination({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View
      accessibilityRole="none"
      className={cn('mx-auto w-full flex-row justify-center', className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={cn('flex-row items-center gap-1', className)} {...props} />;
}

function PaginationItem({ className, ...props }: React.ComponentProps<typeof View>) {
  return <View className={className} {...props} />;
}

type PaginationLinkProps = React.ComponentProps<typeof Pressable> & {
  isActive?: boolean;
  size?: 'default' | 'icon' | 'sm' | 'lg';
};

function PaginationLink({
  className,
  isActive,
  size = 'icon',
  children,
  ...props
}: PaginationLinkProps) {
  return (
    <Pressable
      className={cn(
        buttonVariants({ variant: isActive ? 'outline' : 'ghost', size }),
        className
      )}
      accessibilityState={{ selected: isActive }}
      {...props}>
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </Pressable>
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="ghost" size="default" className={cn('gap-1 px-2.5', className)} {...props}>
      <Icon as={ChevronLeft} className="size-4" />
      <Text>Previous</Text>
    </Button>
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="ghost" size="default" className={cn('gap-1 px-2.5', className)} {...props}>
      <Text>Next</Text>
      <Icon as={ChevronRight} className="size-4" />
    </Button>
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<typeof View>) {
  return (
    <View className={cn('flex size-9 items-center justify-center', className)} {...props}>
      <Icon as={MoreHorizontal} className="size-4" />
    </View>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
