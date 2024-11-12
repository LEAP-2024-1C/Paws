'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { adoptionPostss } from '@/constants/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CellAction } from './cell-action';
import { useContext } from 'react';
import { AdoptionReqContext } from '@/components/context/adoption-context';
import { IAdoptionRequest } from '@/app/interface';
import { ResDialogDemo } from './request-response';

interface AdoptionPostsTableProps {
  data: adoptionPostss[];
  searchKey: string;
}

export function AdoptionTable({ data, searchKey }: AdoptionPostsTableProps) {
  const { adoptionRequests, updateAdoptionRequest } =
    useContext(AdoptionReqContext);
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className=" rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Pet Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Response</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adoptionRequests.map((req) => (
              <TableRow key={req._id}>
                <TableCell>
                  <span className="mr-2">{req.userId?.firstname}</span>
                  <span>{req.userId.lastname}</span>
                </TableCell>
                <TableCell>{req.title}</TableCell>
                <TableCell>
                  {new Date(req.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue="pending"
                    value={req.status}
                    onValueChange={(value) =>
                      updateAdoptionRequest(
                        req._id,
                        value as IAdoptionRequest['status']
                      )
                    }
                  >
                    <SelectTrigger
                      className={`w-[120px] rounded-full px-3 py-1 text-sm font-medium ${
                        req.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.status === 'refused'
                          ? 'bg-red-100 text-red-800'
                          : ' bg-green-100 text-green-800'
                      }`}
                    >
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="refused">Refused</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <ResDialogDemo id={req._id} />
                </TableCell>
                <TableCell>
                  <CellAction id={req._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
        <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
