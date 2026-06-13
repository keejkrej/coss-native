import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/registry/nativewind/components/ui/empty';
import { Text } from '@/registry/nativewind/components/ui/text';

function EmptyPreview() {
  return (
    <Empty className="max-w-sm">
      <EmptyHeader>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try adjusting your search or filters.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline">
          <Text>Clear filters</Text>
        </Button>
      </EmptyContent>
    </Empty>
  );
}

export const emptyPreviews = [{ name: 'Default', component: EmptyPreview }];
