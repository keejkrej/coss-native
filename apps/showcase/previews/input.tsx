import { Input } from '@/registry/nativewind/components/ui/input';
import { View } from 'react-native';

function InputPreview() {
  return (
    <View className="w-full max-w-sm gap-3">
      <Input placeholder="Default input" />
      <Input size="sm" placeholder="Small input" />
      <Input size="lg" placeholder="Large input" />
    </View>
  );
}

export const inputPreviews = [{ name: 'Default', component: InputPreview }];
