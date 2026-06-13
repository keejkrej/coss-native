import { Button } from '@/registry/nativewind/components/ui/button';
import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Input } from '@/registry/nativewind/components/ui/input';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { useScrollToTop } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { COMPONENTS } from '@showcase/lib/constants';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { View } from 'react-native';

export default function ComponentsScreen() {
  const { colorScheme } = useColorScheme();
  const [search, setSearch] = React.useState('');
  const flashListRef = React.useRef(null);
  useScrollToTop(flashListRef);

  const data = !search
    ? COMPONENTS
    : COMPONENTS.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View className="mx-auto w-full max-w-lg flex-1">
      <FlashList
        ref={flashListRef}
        data={data}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="px-4 pb-2"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View className="pb-4">
            <Input placeholder="Search components" onChangeText={setSearch} autoCorrect={false} />
          </View>
        }
        renderItem={({ item, index }) => (
          <Link href={`/components/${item.slug}`} asChild>
            <Link.Trigger>
              <Button
                variant="outline"
                size="lg"
                className={cn(
                  'border-border flex-row justify-between rounded-none border-b-0 pl-4 pr-3.5',
                  index === 0 && 'rounded-t-lg',
                  index === data.length - 1 && 'rounded-b-lg border-b'
                )}>
                <Text className="text-base font-normal">{item.name}</Text>
                <Icon as={ChevronRight} className="text-muted-foreground size-4" />
              </Button>
            </Link.Trigger>
            <Link.Preview
              style={{ backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}
            />
          </Link>
        )}
      />
    </View>
  );
}