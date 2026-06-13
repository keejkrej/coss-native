import { Button } from '@/registry/nativewind/components/ui/button';
import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardTrigger,
} from '@/registry/nativewind/components/ui/preview-card';
import { Text } from '@/registry/nativewind/components/ui/text';

function PreviewCardPreview() {
  return (
    <PreviewCard>
      <PreviewCardTrigger asChild>
        <Button variant="link">
          <Text>@coss</Text>
        </Button>
      </PreviewCardTrigger>
      <PreviewCardContent>
        <Text className="font-semibold">coss</Text>
        <Text className="text-muted-foreground text-sm">Calm open-source software.</Text>
      </PreviewCardContent>
    </PreviewCard>
  );
}

export const previewCardPreviews = [{ name: 'Default', component: PreviewCardPreview }];
