import { Toggle } from '@/registry/nativewind/components/ui/toggle';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

function ToggleOutlinePreview() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed} variant="outline">
      <Text>Bold</Text>
    </Toggle>
  );
}

function ToggleDefaultPreview() {
  const [pressed, setPressed] = React.useState(true);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed} variant="default">
      <Text>Italic</Text>
    </Toggle>
  );
}

function ToggleSizesPreview() {
  return (
    <View className="flex-row gap-2">
      <Toggle variant="outline" size="sm">
        <Text>S</Text>
      </Toggle>
      <Toggle variant="outline" size="default">
        <Text>M</Text>
      </Toggle>
      <Toggle variant="outline" size="lg">
        <Text>L</Text>
      </Toggle>
    </View>
  );
}

export const togglePreviews = [
  { name: 'Outline', component: ToggleOutlinePreview },
  { name: 'Default', component: ToggleDefaultPreview },
  { name: 'Sizes', component: ToggleSizesPreview },
];
