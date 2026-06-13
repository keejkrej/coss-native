import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/registry/nativewind/components/ui/sheet';
import { Text } from '@/registry/nativewind/components/ui/text';

function SheetPreview() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Text>Open Sheet</Text>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            A sheet slides in from the edge of the screen.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export const sheetPreviews = [{ name: 'Default', component: SheetPreview }];
