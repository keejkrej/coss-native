import { ToggleGroup, ToggleGroupItem } from '@/registry/nativewind/components/ui/toggle-group';
import { Text } from '@/registry/nativewind/components/ui/text';
import * as React from 'react';

function ToggleGroupPreview() {
  const [value, setValue] = React.useState('left');

  return (
    <ToggleGroup type="single" value={value} onValueChange={(next) => next && setValue(next)} variant="outline">
      <ToggleGroupItem value="left" isFirst>
        <Text>Left</Text>
      </ToggleGroupItem>
      <ToggleGroupItem value="center">
        <Text>Center</Text>
      </ToggleGroupItem>
      <ToggleGroupItem value="right" isLast>
        <Text>Right</Text>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export const toggleGroupPreviews = [{ name: 'Default', component: ToggleGroupPreview }];
