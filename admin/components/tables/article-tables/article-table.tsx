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
import { CellAction } from './cell-action';
import { BiSearchAlt2 } from 'react-icons/bi';
import { useContext } from 'react';
import { ArticleContext } from '@/components/context/article_context';
import { IArticles } from '@/lib/types';

interface ArticleTableProps {
  searchKey: string;
}

export function ArticleTable({ searchKey }: ArticleTableProps) {
  const { findPost, setSearchValue, deleteArticlePost } =
    useContext(ArticleContext);

  const handleDelete = async (id: string) => {
    await deleteArticlePost(id);
  };
  console.log('article data', findPost);

  return (
    <>
      <div className="flex items-center rounded-xl outline outline-lime-600 md:max-w-sm">
        <Input
          placeholder={`Search ${searchKey}...`}
          className="max-h-20 md:max-w-sm"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BiSearchAlt2 className="h-10 w-10 rounded-r-lg bg-lime-700 p-2 text-white" />
      </div>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow className="border bg-lime-700 pl-5">
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Category Name</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Published On</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {findPost('').map((post: IArticles) => (
              <TableRow key={post._id}>
                <TableCell className="border pl-4">{post.title}</TableCell>
                <TableCell className="border pl-4">
                  {post.category?.name}
                </TableCell>
                <TableCell className="border">Amy Harris</TableCell>
                <TableCell className="border">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </TableCell>
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
