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

function SelectSizesPreview() {
  const [value, setValue] = React.useState<Option | undefined>();
  return (
    <View className="w-full max-w-sm gap-3">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Small" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a" label="Option A">
            <Text>Option A</Text>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger size="lg">
          <SelectValue placeholder="Large" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a" label="Option A">
            <Text>Option A</Text>
          </SelectItem>
        </SelectContent>
      </Select>
    </View>
  );
}

function SelectDisabledPreview() {
  return (
    <View className="w-full max-w-sm">
      <Select>
        <SelectTrigger disabled>
          <SelectValue placeholder="Disabled" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a" label="Option">
            <Text>Option</Text>
          </SelectItem>
        </SelectContent>
      </Select>
    </View>
  );
}

export const selectPreviews = [
  { name: 'Default', component: SelectPreview },
  { name: 'Sizes', component: SelectSizesPreview },
  { name: 'Disabled', component: SelectDisabledPreview },
];
