import { Switch } from '@/registry/nativewind/components/ui/switch';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

function SwitchPreview() {
  const [checked, setChecked] = React.useState(false);
  return (
    <View className="flex-row items-center gap-3">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <Text>Airplane mode</Text>
    </View>
  );
}

export const switchPreviews = [{ name: 'Default', component: SwitchPreview }];
