import { Icon } from '@/registry/nativewind/components/ui/icon';
import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import { MoonStar, Sun } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { Pressable } from 'react-native';

function ThemeToggle() {
  const { colorScheme, setColorScheme } = useColorScheme();

  function toggleTheme() {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Pressable
      onPress={toggleTheme}
      className={cn('web:ring-offset-background web:focus-visible:ring-ring active:opacity-70 web:transition-opacity web:hover:opacity-100 web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2')}
      accessibilityRole="button"
      accessibilityLabel="Toggle theme">
      {colorScheme === 'dark' ? (
        <Icon as={MoonStar} className="text-foreground size-5" />
      ) : (
        <Icon as={Sun} className="text-foreground size-5" />
      )}
      <Text className="sr-only">Toggle theme</Text>
    </Pressable>
  );
}

export { ThemeToggle };
