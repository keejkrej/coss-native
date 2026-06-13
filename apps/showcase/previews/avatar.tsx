import { Avatar, AvatarFallback } from '@/registry/nativewind/components/ui/avatar';
import { Text } from '@/registry/nativewind/components/ui/text';

function AvatarPreview() {
  return (
    <Avatar alt="User" className="size-10">
      <AvatarFallback>
        <Text>CN</Text>
      </AvatarFallback>
    </Avatar>
  );
}

export const avatarPreviews = [{ name: 'Default', component: AvatarPreview }];
