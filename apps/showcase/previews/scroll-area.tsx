import { ScrollArea } from '@/registry/nativewind/components/ui/scroll-area';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';

function ScrollAreaPreview() {
  return (
    <ScrollArea className="h-32 w-full max-w-sm rounded-md border p-4">
      <View className="gap-2">
        {Array.from({ length: 12 }, (_, index) => (
          <Text key={index}>Scrollable item {index + 1}</Text>
        ))}
      </View>
    </ScrollArea>
  );
}

export const scrollAreaPreviews = [{ name: 'Default', component: ScrollAreaPreview }];
