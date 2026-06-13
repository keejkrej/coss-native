import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from '@/registry/nativewind/components/ui/popover';
import { Text } from '@/registry/nativewind/components/ui/text';

function PopoverPreview() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Text>Open Popover</Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Dimensions</PopoverTitle>
        <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
      </PopoverContent>
    </Popover>
  );
}

export const popoverPreviews = [{ name: 'Default', component: PopoverPreview }];
