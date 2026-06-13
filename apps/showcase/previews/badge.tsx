import { Badge } from '@/registry/nativewind/components/ui/badge';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';

function BadgeDefaultPreview() {
  return (
    <View className="flex-row flex-wrap gap-2">
      <Badge><Text>Default</Text></Badge>
      <Badge variant="secondary"><Text>Secondary</Text></Badge>
      <Badge variant="outline"><Text>Outline</Text></Badge>
      <Badge variant="destructive"><Text>Destructive</Text></Badge>
    </View>
  );
}

function BadgeStatusPreview() {
  return (
    <View className="flex-row flex-wrap gap-2">
      <Badge variant="success"><Text>Success</Text></Badge>
      <Badge variant="warning"><Text>Warning</Text></Badge>
      <Badge variant="info"><Text>Info</Text></Badge>
      <Badge variant="error"><Text>Error</Text></Badge>
    </View>
  );
}

export const badgePreviews = [
  { name: 'Variants', component: BadgeDefaultPreview },
  { name: 'Status', component: BadgeStatusPreview },
];
