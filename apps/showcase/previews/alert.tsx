import { Alert, AlertDescription, AlertTitle } from '@/registry/nativewind/components/ui/alert';

function AlertPreview() {
  return (
    <Alert className="max-w-sm">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  );
}

export const alertPreviews = [{ name: 'Default', component: AlertPreview }];
