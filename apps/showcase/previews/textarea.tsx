import { Textarea } from '@/registry/nativewind/components/ui/textarea';
import { View } from 'react-native';

function TextareaPreview() {
  return (
    <View className="w-full max-w-sm">
      <Textarea placeholder="Write your message here..." />
    </View>
  );
}

export const textareaPreviews = [{ name: 'Default', component: TextareaPreview }];
