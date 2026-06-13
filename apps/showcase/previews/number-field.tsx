import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/registry/nativewind/components/ui/number-field';
import * as React from 'react';

function NumberFieldPreview() {
  const [value, setValue] = React.useState<number | null>(5);

  return (
    <NumberField value={value} onValueChange={setValue} min={0} max={10} className="w-full max-w-xs">
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}

export const numberFieldPreviews = [{ name: 'Default', component: NumberFieldPreview }];
