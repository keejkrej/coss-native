import { Toggle } from '@/registry/nativewind/components/ui/toggle';
import { Text } from '@/registry/nativewind/components/ui/text';
import * as React from 'react';

function TogglePreview() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <Toggle pressed={pressed} onPressedChange={setPressed} variant="outline">
      <Text>Bold</Text>
    </Toggle>
  );
}

export const togglePreviews = [{ name: 'Default', component: TogglePreview }];
