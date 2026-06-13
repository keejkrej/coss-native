import { Text } from '@/registry/nativewind/components/ui/text';
import { cn } from '@/registry/nativewind/lib/utils';
import * as TablePrimitive from '@rn-primitives/table';
import { ScrollView, View } from 'react-native';

function Table({
  className,
  ...props
}: React.ComponentProps<typeof TablePrimitive.Root>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TablePrimitive.Root className={cn('w-full', className)} {...props} />
    </ScrollView>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<typeof TablePrimitive.Header>) {
  return <TablePrimitive.Header className={cn(className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<typeof TablePrimitive.Body>) {
  return <TablePrimitive.Body className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<typeof TablePrimitive.Footer>) {
  return <TablePrimitive.Footer className={cn(className)} {...props} />;
}

function TableRow({ className, ...props }: React.ComponentProps<typeof TablePrimitive.Row>) {
  return (
    <TablePrimitive.Row
      className={cn('border-border border-b flex-row', className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<typeof TablePrimitive.Head>) {
  return (
    <TablePrimitive.Head
      className={cn('text-muted-foreground h-10 px-2 text-left align-middle font-medium', className)}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<typeof TablePrimitive.Cell>) {
  return <TablePrimitive.Cell className={cn('p-2 align-middle', className)} {...props} />;
}

function TableCaption({ className, ...props }: React.ComponentProps<typeof Text>) {
  return <Text className={cn('text-muted-foreground mt-4 text-sm', className)} {...props} />;
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
