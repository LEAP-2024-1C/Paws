'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

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
import { Product } from '@/constants/data';
import { CellAction } from './cell-action';

interface DataTableProps {
  data: Product[];
  searchKey: string;
}

export function ProductTable({ data, searchKey }: DataTableProps) {
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
              <TableHead>Product Image</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Product Category</TableHead>
              <TableHead>Product Price</TableHead>
              <TableHead>Product Quantity</TableHead>
              <TableHead>Product Description</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((product) => (
              <TableRow key={product.id?.toString() || product._id?.toString()}>
                <TableCell>
                  <div className="relative h-10 w-10">
                    <Image
                      src={product.images[0] || '/placeholder-image.jpg'}
                      alt={product.name || 'Product image'}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell>{product.name?.toString()}</TableCell>
                <TableCell>{product.category?.name?.toString()}</TableCell>
                <TableCell>{product.price?.toString()}$</TableCell>
                <TableCell>{product.quantity?.toString()}</TableCell>
                <TableCell>{product.description?.toString()}</TableCell>
                <TableCell>
                  <CellAction
                    id={product.id?.toString() || product._id?.toString()}
                  />
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
