import { Progress } from '@/registry/nativewind/components/ui/progress';
import { View } from 'react-native';

function ProgressPreview() {
  return (
    <View className="w-full max-w-sm">
      <Progress value={45} />
    </View>
  );
}

export const progressPreviews = [{ name: 'Default', component: ProgressPreview }];
