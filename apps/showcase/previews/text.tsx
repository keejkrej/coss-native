import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';

function TextPreview() {
  return (
    <View className="w-full max-w-sm gap-2">
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="p">Paragraph text with coss foreground tokens.</Text>
      <Text variant="muted">Muted text</Text>
    </View>
  );
}

export const textPreviews = [{ name: 'Typography', component: TextPreview }];
