import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '@/registry/nativewind/components/ui/menu';
import { Text } from '@/registry/nativewind/components/ui/text';

function MenuPreview() {
  return (
    <Menu>
      <MenuTrigger asChild>
        <Button variant="outline">
          <Text>Open Menu</Text>
        </Button>
      </MenuTrigger>
      <MenuContent>
        <MenuItem>
          <Text>Profile</Text>
        </MenuItem>
        <MenuItem>
          <Text>Settings</Text>
        </MenuItem>
        <MenuItem variant="destructive">
          <Text>Log out</Text>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}

export const menuPreviews = [{ name: 'Default', component: MenuPreview }];
