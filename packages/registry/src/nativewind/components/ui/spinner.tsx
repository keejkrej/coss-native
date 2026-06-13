import { Icon } from '@/registry/nativewind/components/ui/icon';
import { cn } from '@/registry/nativewind/lib/utils';
import { Loader2 } from 'lucide-react-native';
import { View } from 'react-native';

function Spinner({ className, size = 16, ...props }: Omit<React.ComponentProps<typeof Icon>, 'as'>) {
  return (
    <View accessibilityRole="progressbar" accessibilityLabel="Loading">
      <Icon as={Loader2} size={size} className={cn('animate-spin', className)} {...props} />
    </View>
  );
}

export { Spinner };
