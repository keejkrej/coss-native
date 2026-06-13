import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/registry/nativewind/components/ui/input-group';

function InputGroupPreview() {
  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  );
}

export const inputGroupPreviews = [{ name: 'Default', component: InputGroupPreview }];
