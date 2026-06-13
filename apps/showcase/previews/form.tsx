import { Button } from '@/registry/nativewind/components/ui/button';
import { Field, FieldControl, FieldLabel } from '@/registry/nativewind/components/ui/field';
import { Form } from '@/registry/nativewind/components/ui/form';
import { Input } from '@/registry/nativewind/components/ui/input';
import { Text } from '@/registry/nativewind/components/ui/text';

function FormPreview() {
  return (
    <Form className="w-full max-w-sm">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl>
          <Input placeholder="you@example.com" />
        </FieldControl>
      </Field>
      <Button>
        <Text>Submit</Text>
      </Button>
    </Form>
  );
}

export const formPreviews = [{ name: 'Default', component: FormPreview }];
