import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/registry/nativewind/components/ui/table';
import { Text } from '@/registry/nativewind/components/ui/text';

function TablePreview() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <Text>Name</Text>
          </TableHead>
          <TableHead>
            <Text>Status</Text>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Text>Alice</Text>
          </TableCell>
          <TableCell>
            <Text>Active</Text>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Text>Bob</Text>
          </TableCell>
          <TableCell>
            <Text>Inactive</Text>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export const tablePreviews = [{ name: 'Default', component: TablePreview }];
