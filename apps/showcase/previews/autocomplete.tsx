import {
  Autocomplete,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from '@/registry/nativewind/components/ui/autocomplete';
import { Text } from '@/registry/nativewind/components/ui/text';
import * as React from 'react';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

function AutocompletePreview() {
  const [value, setValue] = React.useState<string | undefined>();

  return (
    <Autocomplete items={items} value={value} onValueChange={setValue} className="w-full max-w-sm">
      <AutocompleteInput placeholder="Search fruit..." showTrigger />
      <AutocompletePopup>
        <AutocompleteList />
      </AutocompletePopup>
    </Autocomplete>
  );
}

export const autocompletePreviews = [{ name: 'Default', component: AutocompletePreview }];
