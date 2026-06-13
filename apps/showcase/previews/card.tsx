import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/registry/nativewind/components/ui/card';
import { Button } from '@/registry/nativewind/components/ui/button';
import { Text } from '@/registry/nativewind/components/ui/text';

function CardPreview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here.</CardDescription>
      </CardHeader>
      <CardContent>
        <Text>Card content with coss styling tokens.</Text>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Text>Action</Text>
        </Button>
      </CardFooter>
    </Card>
  );
}

function CardWithActionPreview() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage how you receive updates.</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">
            <Text>Settings</Text>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Text>Email and push preferences appear here.</Text>
      </CardContent>
    </Card>
  );
}

export const cardPreviews = [
  { name: 'Default', component: CardPreview },
  { name: 'With action', component: CardWithActionPreview },
];
