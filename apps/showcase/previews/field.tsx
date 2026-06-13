import { Field, FieldControl, FieldDescription, FieldLabel } from '@/registry/nativewind/components/ui/field';
import { Input } from '@/registry/nativewind/components/ui/input';

function FieldPreview() {
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>Username</FieldLabel>
      <FieldControl>
        <Input placeholder="shadcn" />
      </FieldControl>
      <FieldDescription>This is your public display name.</FieldDescription>
    </Field>
  );
}

export const fieldPreviews = [{ name: 'Default', component: FieldPreview }];
