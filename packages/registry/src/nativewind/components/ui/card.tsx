import { Text, TextClassContext } from '@/registry/nativewind/components/ui/text';
import { cn, SURFACE_SHADOW } from '@/registry/nativewind/lib/utils';
import * as React from 'react';
import { View } from 'react-native';

const CardFrameContext = React.createContext(false);

function Card({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  const inFrame = React.useContext(CardFrameContext);

  return (
    <TextClassContext.Provider value="text-card-foreground">
      <View
        className={cn(
          'bg-card border-border relative flex flex-col rounded-2xl border',
          !inFrame && SURFACE_SHADOW,
          inFrame && 'rounded-xl border-0 shadow-none',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function CardFrame({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <CardFrameContext.Provider value={true}>
      <View
        className={cn(
          'bg-muted/72 border-border flex flex-col overflow-hidden rounded-2xl border',
          SURFACE_SHADOW,
          className
        )}
        {...props}
      />
    </CardFrameContext.Provider>
  );
}

function CardFrameHeader({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn(
        'grid auto-rows-min grid-cols-[1fr_auto] grid-rows-[auto_auto] items-start gap-x-4 gap-y-1 px-6 py-4',
        className
      )}
      {...props}
    />
  );
}

function CardFrameTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return <Text className={cn('col-start-1 row-start-1 self-center text-sm font-semibold', className)} {...props} />;
}

function CardFrameDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return (
    <Text className={cn('col-start-1 row-start-2 self-center text-sm text-muted-foreground', className)} {...props} />
  );
}

function CardFrameAction({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn('col-start-2 row-span-2 row-start-1 flex-row self-center justify-self-end', className)}
      {...props}
    />
  );
}

function CardFrameFooter({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('px-6 py-4', className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn(
        'grid auto-rows-min grid-cols-[1fr_auto] grid-rows-[auto_auto] items-start gap-x-4 gap-y-1.5 p-6',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return (
    <Text
      role="heading"
      aria-level={3}
      className={cn('col-start-1 row-start-1 text-lg font-semibold leading-none', className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text> & React.RefAttributes<typeof Text>) {
  return (
    <Text className={cn('col-start-1 row-start-2 text-sm text-muted-foreground', className)} {...props} />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return (
    <View
      className={cn('col-start-2 row-span-2 row-start-1 flex-row self-start justify-self-end', className)}
      {...props}
    />
  );
}

function CardPanel({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex-1 p-6', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <CardPanel className={className} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<typeof View> & React.RefAttributes<View>) {
  return <View className={cn('flex flex-row items-center p-6', className)} {...props} />;
}

export {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardFrame,
  CardFrameAction,
  CardFrameDescription,
  CardFrameFooter,
  CardFrameHeader,
  CardFrameTitle,
  CardHeader,
  CardPanel,
  CardTitle,
};
