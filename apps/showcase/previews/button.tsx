import { Button } from '@/registry/nativewind/components/ui/button';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Text } from '@/registry/nativewind/components/ui/text';
import { Plus } from 'lucide-react-native';
import { View } from 'react-native';

function ButtonDefaultPreview() {
  return (
    <Button>
      <Text>Button</Text>
    </Button>
  );
}

function ButtonVariantsPreview() {
  return (
    <View className="gap-3">
      <Button variant="secondary"><Text>Secondary</Text></Button>
      <Button variant="outline"><Text>Outline</Text></Button>
      <Button variant="ghost"><Text>Ghost</Text></Button>
      <Button variant="destructive"><Text>Destructive</Text></Button>
      <Button variant="destructive-outline"><Text>Destructive Outline</Text></Button>
      <Button variant="link"><Text>Link</Text></Button>
    </View>
  );
}

function ButtonSizesPreview() {
  return (
    <View className="gap-3">
      <Button size="xs"><Text>Extra Small</Text></Button>
      <Button size="sm"><Text>Small</Text></Button>
      <Button size="default"><Text>Default</Text></Button>
      <Button size="lg"><Text>Large</Text></Button>
      <Button size="xl"><Text>Extra Large</Text></Button>
    </View>
  );
}

function ButtonLoadingPreview() {
  return (
    <Button loading>
      <Text>Loading</Text>
    </Button>
  );
}

function ButtonIconPreview() {
  return (
    <View className="flex-row gap-3">
      <Button size="icon"><Icon as={Plus} className="size-4" /></Button>
      <Button size="icon-sm"><Icon as={Plus} className="size-4" /></Button>
      <Button size="icon-lg"><Icon as={Plus} className="size-4" /></Button>
    </View>
  );
}

export const buttonPreviews = [
  { name: 'Default', component: ButtonDefaultPreview },
  { name: 'Variants', component: ButtonVariantsPreview },
  { name: 'Sizes', component: ButtonSizesPreview },
  { name: 'Loading', component: ButtonLoadingPreview },
  { name: 'Icon', component: ButtonIconPreview },
];
