import {
  Combobox,
  ComboboxChips,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxPopup,
} from '@/registry/nativewind/components/ui/combobox';
import * as React from 'react';

const items = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

function ComboboxPreview() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <Combobox items={items} value={value} onValueChange={(next) => setValue(Array.isArray(next) ? next : [])} multiple className="w-full max-w-sm">
      <ComboboxChips items={items} />
      <ComboboxInput placeholder="Select frameworks..." showTrigger />
      <ComboboxPopup>
        <ComboboxList />
      </ComboboxPopup>
    </Combobox>
  );
}

export const comboboxPreviews = [{ name: 'Default', component: ComboboxPreview }];
