import { Meter, MeterLabel, MeterValue } from '@/registry/nativewind/components/ui/meter';
import { View } from 'react-native';

function MeterPreview() {
  return (
    <View className="w-full max-w-sm gap-2">
      <View className="flex-row items-center justify-between">
        <MeterLabel>Storage used</MeterLabel>
        <MeterValue>60%</MeterValue>
      </View>
      <Meter value={60} />
    </View>
  );
}

export const meterPreviews = [{ name: 'Default', component: MeterPreview }];
