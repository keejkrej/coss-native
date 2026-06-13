import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Drawer,
  DrawerBar,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from '@/registry/nativewind/components/ui/drawer';
import { Text } from '@/registry/nativewind/components/ui/text';

function DrawerPreview() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Text>Open Drawer</Text>
        </Button>
      </DrawerTrigger>
      <DrawerPopup>
        <DrawerBar />
        <DrawerPanel>
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>
                <Text>Done</Text>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerPanel>
      </DrawerPopup>
    </Drawer>
  );
}

export const drawerPreviews = [{ name: 'Default', component: DrawerPreview }];
