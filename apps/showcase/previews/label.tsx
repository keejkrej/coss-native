import { Label } from '@/registry/nativewind/components/ui/label';

function LabelPreview() {
  return <Label>Email address</Label>;
}

export const labelPreviews = [{ name: 'Default', component: LabelPreview }];
