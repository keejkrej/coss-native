import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/registry/nativewind/components/ui/toast';

function ToastPreview() {
  return (
    <ToastProvider>
      <Toast open onOpenChange={() => {}} className="w-full max-w-sm">
        <ToastTitle>Scheduled</ToastTitle>
        <ToastDescription>Your meeting starts in 15 minutes.</ToastDescription>
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}

export const toastPreviews = [{ name: 'Default', component: ToastPreview }];
