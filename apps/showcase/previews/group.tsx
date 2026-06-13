import { Group, GroupSeparator, GroupText } from '@/registry/nativewind/components/ui/group';

function GroupPreview() {
  return (
    <Group className="rounded-md border px-3 py-2">
      <GroupText>Products</GroupText>
      <GroupSeparator orientation="vertical" className="mx-2 h-4" />
      <GroupText>Docs</GroupText>
      <GroupSeparator orientation="vertical" className="mx-2 h-4" />
      <GroupText>Blog</GroupText>
    </Group>
  );
}

export const groupPreviews = [{ name: 'Default', component: GroupPreview }];
