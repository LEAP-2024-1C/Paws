import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Ellipsis } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '../ui/button';

const tableConstData = [
  {
    col1: 'Firstname',
    status: 'Username'
  },
  {
    col1: 'Lastname',
    status: 'Lastname'
  },
  {
    col1: 'Email',
    status: 'a@gmail.com'
  },
  {
    col1: 'Phone Number',
    status: '99999999'
  },
  {
    col1: ' Have you owned a pet before?',
    status: 'Yes'
  },
  {
    col1: 'Do you currently own any pets?',
    status: 'No'
  },
  {
    col1: 'How many members are in your household?',
    status: '4+'
  },
  {
    col1: 'What are the age ranges of the those in your household?',
    status: 'under 5 years old, 18+'
  },
  {
    col1: 'Description',
    status:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deleniti ab unde est dignissimos aliquid, sunt quia ipsam quisquam nisi adipisci!'
  }
];

export function AdoptionReqDetail() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Ellipsis className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Inquiries</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableConstData.map((i) => (
              <TableRow key={i.col1}>
                <TableCell className="font-medium">{i.col1}</TableCell>
                <TableCell>{i.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
