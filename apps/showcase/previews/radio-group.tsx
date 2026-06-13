import { Label } from '@/registry/nativewind/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/registry/nativewind/components/ui/radio-group';
import { View } from 'react-native';
import * as React from 'react';

function RadioGroupPreview() {
  const [value, setValue] = React.useState('comfortable');

  return (
    <RadioGroup value={value} onValueChange={setValue}>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="default" />
        <Label>Default</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="comfortable" />
        <Label>Comfortable</Label>
      </View>
      <View className="flex-row items-center gap-3">
        <RadioGroupItem value="compact" />
        <Label>Compact</Label>
      </View>
    </RadioGroup>
  );
}

export const radioGroupPreviews = [{ name: 'Default', component: RadioGroupPreview }];
