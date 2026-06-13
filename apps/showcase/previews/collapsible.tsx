import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/registry/nativewind/components/ui/collapsible';
import { Text } from '@/registry/nativewind/components/ui/text';
import * as React from 'react';

function CollapsiblePreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full max-w-sm gap-2">
      <CollapsibleTrigger asChild>
        <Button variant="outline">
          <Text>{open ? 'Hide details' : 'Show details'}</Text>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Text className="text-muted-foreground pt-2 text-sm">
          Hidden content revealed when expanded.
        </Text>
      </CollapsibleContent>
    </Collapsible>
  );
}

export const collapsiblePreviews = [{ name: 'Default', component: CollapsiblePreview }];
