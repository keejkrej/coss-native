import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  type Option,
} from '@/registry/nativewind/components/ui/select';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

function SelectPreview() {
  const [value, setValue] = React.useState<Option | undefined>();
  return (
    <View className="w-full max-w-sm">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple" label="Apple">
            <Text>Apple</Text>
          </SelectItem>
          <SelectItem value="banana" label="Banana">
            <Text>Banana</Text>
          </SelectItem>
          <SelectItem value="orange" label="Orange">
            <Text>Orange</Text>
          </SelectItem>
        </SelectContent>
      </Select>
    </View>
  );
}

export const selectPreviews = [{ name: 'Default', component: SelectPreview }];
