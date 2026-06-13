import { Alert, AlertDescription, AlertTitle } from '@/registry/nativewind/components/ui/alert';
import { View } from 'react-native';

function AlertDefaultPreview() {
  return (
    <Alert className="max-w-sm">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  );
}

function AlertErrorPreview() {
  return (
    <Alert variant="error" className="max-w-sm">
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>
    </Alert>
  );
}

function AlertInfoPreview() {
  return (
    <Alert variant="info" className="max-w-sm">
      <AlertTitle>Did you know?</AlertTitle>
      <AlertDescription>You can customize components after installing them.</AlertDescription>
    </Alert>
  );
}

function AlertSuccessPreview() {
  return (
    <Alert variant="success" className="max-w-sm">
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>Your changes have been saved.</AlertDescription>
    </Alert>
  );
}

function AlertWarningPreview() {
  return (
    <Alert variant="warning" className="max-w-sm">
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>Your account will be suspended in 3 days.</AlertDescription>
    </Alert>
  );
}

function AlertVariantsPreview() {
  return (
    <View className="gap-3">
      <Alert variant="error" className="max-w-sm">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Action failed.</AlertDescription>
      </Alert>
      <Alert variant="info" className="max-w-sm">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>For your information.</AlertDescription>
      </Alert>
      <Alert variant="success" className="max-w-sm">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>All done.</AlertDescription>
      </Alert>
      <Alert variant="warning" className="max-w-sm">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Proceed with caution.</AlertDescription>
      </Alert>
    </View>
  );
}

export const alertPreviews = [
  { name: 'Default', component: AlertDefaultPreview },
  { name: 'Error', component: AlertErrorPreview },
  { name: 'Info', component: AlertInfoPreview },
  { name: 'Success', component: AlertSuccessPreview },
  { name: 'Warning', component: AlertWarningPreview },
  { name: 'All Variants', component: AlertVariantsPreview },
];
