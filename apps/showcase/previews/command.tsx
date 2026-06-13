import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandDialogPopup,
  CommandDialogTrigger,
  CommandEmpty,
  CommandInput,
  CommandList,
} from '@/registry/nativewind/components/ui/command';
import { AutocompleteItemData } from '@/registry/nativewind/components/ui/autocomplete-primitive';
import { Text } from '@/registry/nativewind/components/ui/text';
import * as React from 'react';
import { View } from 'react-native';

const items: AutocompleteItemData[] = [
  { value: 'profile', label: 'Profile' },
  { value: 'settings', label: 'Settings' },
  { value: 'logout', label: 'Log out' },
];

function CommandInlinePreview() {
  const [value, setValue] = React.useState<string | undefined>();

  return (
    <View className="w-full max-w-sm">
      <Command items={items} value={value} onValueChange={setValue} />
    </View>
  );
}

function CommandDialogPreview() {
  return (
    <CommandDialog>
      <CommandDialogTrigger asChild>
        <Button variant="outline">
          <Text>Open Command</Text>
        </Button>
      </CommandDialogTrigger>
      <CommandDialogPopup className="gap-2 p-4">
        <Command items={items}>
          <CommandInput placeholder="Type a command..." />
          <CommandList />
          <CommandEmpty>No results found.</CommandEmpty>
        </Command>
      </CommandDialogPopup>
    </CommandDialog>
  );
}

export const commandPreviews = [
  { name: 'Inline', component: CommandInlinePreview },
  { name: 'Dialog', component: CommandDialogPreview },
];
