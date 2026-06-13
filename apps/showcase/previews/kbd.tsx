import { Kbd, KbdGroup } from '@/registry/nativewind/components/ui/kbd';

function KbdPreview() {
  return (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}

export const kbdPreviews = [{ name: 'Default', component: KbdPreview }];
