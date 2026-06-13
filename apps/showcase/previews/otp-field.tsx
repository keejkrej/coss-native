import { OTPField, OTPFieldInput } from '@/registry/nativewind/components/ui/otp-field';
import * as React from 'react';

function OTPFieldPreview() {
  const [value, setValue] = React.useState('');

  return (
    <OTPField value={value} onChange={setValue} maxLength={6}>
      <OTPFieldInput />
    </OTPField>
  );
}

export const otpFieldPreviews = [{ name: 'Default', component: OTPFieldPreview }];
