import { Calendar } from '@/registry/nativewind/components/ui/calendar';
import * as React from 'react';

function CalendarPreview() {
  const [selected, setSelected] = React.useState<Date | undefined>(new Date());

  return <Calendar selected={selected} onSelect={setSelected} />;
}

export const calendarPreviews = [{ name: 'Default', component: CalendarPreview }];
