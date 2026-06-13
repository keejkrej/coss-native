import { Slider } from '@/registry/nativewind/components/ui/slider';
import { View } from 'react-native';
import * as React from 'react';

function SliderPreview() {
  const [value, setValue] = React.useState(50);

  return (
    <View className="w-full max-w-sm">
      <Slider value={value} onValueChange={(next) => setValue(next[0] ?? value)} max={100} step={1} />
    </View>
  );
}

export const sliderPreviews = [{ name: 'Default', component: SliderPreview }];
