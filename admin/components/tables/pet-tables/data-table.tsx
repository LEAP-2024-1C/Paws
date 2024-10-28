'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Pets } from '@/constants/data';
import { CellAction } from './cell-action';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

interface PetDataTableProps {
  data: Pets[];
  searchKey: string;
}

export function PetDataTable({ data, searchKey }: PetDataTableProps) {
  return (
    <>
      <Input
        placeholder={`Search ${searchKey}...`}
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
        <Table className="relative">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Breed</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Breed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((pet) => (
              <TableRow key={pet.id}>
                <TableCell>{pet.name}</TableCell>
                <TableCell>{pet.breed}</TableCell>
                <TableCell>{pet.age}</TableCell>
                <TableCell>{pet.gender}</TableCell>
                <TableCell>
                  <CellAction id={pet.id} />
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
