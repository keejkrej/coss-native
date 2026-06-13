import { Checkbox } from '@/registry/nativewind/components/ui/checkbox';
import { CheckboxGroup } from '@/registry/nativewind/components/ui/checkbox-group';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';
import * as React from 'react';

function CheckboxGroupPreview() {
  const [notifications, setNotifications] = React.useState(false);
  const [marketing, setMarketing] = React.useState(true);

  return (
    <CheckboxGroup>
      <View className="flex-row items-center gap-3">
        <Checkbox checked={notifications} onCheckedChange={setNotifications} />
        <Text>Email notifications</Text>
      </View>
      <View className="flex-row items-center gap-3">
        <Checkbox checked={marketing} onCheckedChange={setMarketing} />
        <Text>Marketing emails</Text>
      </View>
    </CheckboxGroup>
  );
}

export const checkboxGroupPreviews = [{ name: 'Default', component: CheckboxGroupPreview }];
