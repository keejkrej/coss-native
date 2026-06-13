import { Fieldset, FieldsetLegend } from '@/registry/nativewind/components/ui/fieldset';
import { Input } from '@/registry/nativewind/components/ui/input';
import { Label } from '@/registry/nativewind/components/ui/label';
import { View } from 'react-native';

function FieldsetPreview() {
  return (
    <Fieldset className="w-full max-w-sm">
      <FieldsetLegend>Profile</FieldsetLegend>
      <View className="gap-3">
        <View className="gap-2">
          <Label>Name</Label>
          <Input placeholder="Your name" />
        </View>
        <View className="gap-2">
          <Label>Email</Label>
          <Input placeholder="you@example.com" />
        </View>
      </View>
    </Fieldset>
  );
}

export const fieldsetPreviews = [{ name: 'Default', component: FieldsetPreview }];
