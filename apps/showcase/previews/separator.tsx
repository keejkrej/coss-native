import { Separator } from '@/registry/nativewind/components/ui/separator';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';

function SeparatorPreview() {
  return (
    <View className="w-full max-w-sm gap-4">
      <Text>Above</Text>
      <Separator />
      <Text>Below</Text>
    </View>
  );
}

export const separatorPreviews = [{ name: 'Default', component: SeparatorPreview }];
