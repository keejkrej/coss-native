import { Button } from '@/registry/nativewind/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/registry/nativewind/components/ui/sidebar';
import { Text } from '@/registry/nativewind/components/ui/text';
import { View } from 'react-native';

function SidebarPreview() {
  return (
    <View className="border-border h-80 w-full overflow-hidden rounded-xl border">
      <SidebarProvider>
        <Sidebar collapsible="none">
          <SidebarHeader>
            <Text className="px-2 font-semibold">Acme Inc</Text>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Platform</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <Text>Dashboard</Text>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <Text>Projects</Text>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <SidebarInset className="p-4">
          <View className="mb-3 flex-row items-center gap-2">
            <SidebarTrigger />
            <Text className="font-medium">Dashboard</Text>
          </View>
          <Text className="text-muted-foreground text-sm">Sidebar layout preview.</Text>
        </SidebarInset>
      </SidebarProvider>
    </View>
  );
}

export const sidebarPreviews = [{ name: 'Default', component: SidebarPreview }];
