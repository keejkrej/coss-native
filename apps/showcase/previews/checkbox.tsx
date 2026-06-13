import { Checkbox } from '@/registry/nativewind/components/ui/checkbox';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

function CheckboxPreview() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="flex-row items-center gap-3">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <Text>Accept terms</Text>
    </View>
  );
}

export const checkboxPreviews = [{ name: 'Default', component: CheckboxPreview }];
