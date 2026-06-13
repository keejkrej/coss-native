import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/registry/nativewind/components/ui/dialog';
import { Text } from '@/registry/nativewind/components/ui/text';

function DialogPreview() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Text>Open Dialog</Text>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This dialog uses coss naming aliases (DialogPopup, DialogBackdrop) internally.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">
            <Text>Cancel</Text>
          </Button>
          <Button>
            <Text>Continue</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export const dialogPreviews = [{ name: 'Default', component: DialogPreview }];
