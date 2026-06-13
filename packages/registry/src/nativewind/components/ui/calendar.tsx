import { cn } from '@/registry/nativewind/lib/utils';
import {
  Calendar as FlashCalendar,
  fromDateId,
  toDateId,
  type CalendarActiveDateRange,
} from '@marceloterreiro/flash-calendar';
import * as React from 'react';
import { View } from 'react-native';

type CalendarProps = {
  className?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  mode?: 'single' | 'range';
  showOutsideDays?: boolean;
  disabled?: boolean;
};

function Calendar({
  className,
  selected,
  onSelect,
  mode = 'single',
}: CalendarProps) {
  const monthDate = selected ?? new Date();
  const calendarActiveDateRanges = React.useMemo<CalendarActiveDateRange[]>(() => {
    if (!selected) return [];
    const id = toDateId(selected);
    return [{ startId: id, endId: id }];
  }, [selected]);

  return (
    <View className={cn('w-full max-w-sm', className)}>
      <FlashCalendar
        calendarMonthId={toDateId(monthDate)}
        calendarActiveDateRanges={mode === 'single' ? calendarActiveDateRanges : calendarActiveDateRanges}
        onCalendarDayPress={(dateId) => {
          const next = fromDateId(dateId);
          if (selected && toDateId(selected) === dateId) {
            onSelect?.(undefined);
            return;
          }
          onSelect?.(next);
        }}
        calendarDayHeight={36}
        calendarRowVerticalSpacing={8}
        calendarRowHorizontalSpacing={4}
      />
    </View>
  );
}

export { Calendar };
