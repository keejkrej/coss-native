import { Skeleton } from '@/registry/nativewind/components/ui/skeleton';
import { View } from 'react-native';

function SkeletonPreview() {
  return (
    <View className="w-full max-w-sm gap-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-20 w-full rounded-xl" />
    </View>
  );
}

export const skeletonPreviews = [{ name: 'Default', component: SkeletonPreview }];
