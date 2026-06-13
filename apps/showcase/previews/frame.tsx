import {
  Frame,
  FrameDescription,
  FrameHeader,
  FramePanel,
  FrameTitle,
} from '@/registry/nativewind/components/ui/frame';
import { Text } from '@/registry/nativewind/components/ui/text';

function FramePreview() {
  return (
    <Frame className="w-full max-w-sm">
      <FrameHeader>
        <FrameTitle>Frame</FrameTitle>
        <FrameDescription>A container with nested panel styling.</FrameDescription>
      </FrameHeader>
      <FramePanel>
        <Text>Panel content goes here.</Text>
      </FramePanel>
    </Frame>
  );
}

export const framePreviews = [{ name: 'Default', component: FramePreview }];
