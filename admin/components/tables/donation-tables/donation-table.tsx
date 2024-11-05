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
import { DonationPosts } from '@/constants/data';
import { CellAction } from './cell-action';
import { useContext } from 'react';
import { DonationContext } from '@/components/context/donation-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface DonationTableProps {
  data: DonationPosts[];
  searchKey: string;
}

export function DonationTable({ data, searchKey }: DonationTableProps) {
  const { getDonationPosts } = useContext(DonationContext);
  // console.log('DPS', getDonationPosts); //olon duudaad bga aldaag zasah
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>Img</TableHead>
              <TableHead>Pet Name</TableHead>
              <TableHead>Neccesary amount</TableHead>
              <TableHead>Current amount</TableHead>
              <TableHead>Created date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="gap-2">
            {getDonationPosts.map((post) => (
              <TableRow
                // key={post.id}
                className=" "
              >
                <TableCell>
                  <Avatar>
                    <AvatarImage src={post.images[0]} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{post.petId?.name}</TableCell>
                <TableCell>{post.totalAmount}</TableCell>
                <TableCell>current amount</TableCell>
                <TableCell>
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>
                  <CellAction id={post._id} />
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
