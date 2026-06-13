import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/nativewind/components/ui/tabs';
import { Text } from '@/registry/nativewind/components/ui/text';
import * as React from 'react';

function TabsPreview() {
  const [value, setValue] = React.useState('account');

  return (
    <Tabs value={value} onValueChange={setValue} className="w-full max-w-sm">
      <TabsList>
        <TabsTrigger value="account">
          <Text>Account</Text>
        </TabsTrigger>
        <TabsTrigger value="password">
          <Text>Password</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Text>Make changes to your account here.</Text>
      </TabsContent>
      <TabsContent value="password">
        <Text>Change your password here.</Text>
      </TabsContent>
    </Tabs>
  );
}

function TabsUnderlinePreview() {
  const [value, setValue] = React.useState('overview');

  return (
    <Tabs value={value} onValueChange={setValue} className="w-full max-w-sm">
      <TabsList variant="underline">
        <TabsTrigger value="overview">
          <Text>Overview</Text>
        </TabsTrigger>
        <TabsTrigger value="analytics">
          <Text>Analytics</Text>
        </TabsTrigger>
        <TabsTrigger value="reports">
          <Text>Reports</Text>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Text>Overview content.</Text>
      </TabsContent>
      <TabsContent value="analytics">
        <Text>Analytics content.</Text>
      </TabsContent>
      <TabsContent value="reports">
        <Text>Reports content.</Text>
      </TabsContent>
    </Tabs>
  );
}

export const tabsPreviews = [
  { name: 'Default', component: TabsPreview },
  { name: 'Underline', component: TabsUnderlinePreview },
];
