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
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { IArticles } from '@/lib/types';
import { BiSearchAlt2 } from 'react-icons/bi';

interface ArticleTableProps {
  data: IArticles[];
  searchKey: string;
}

export function ArticleTable({ data, searchKey }: ArticleTableProps) {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const getArticles = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch articles');
    }
  };
  const findPost = articles?.filter(
    (cards) => cards?.title?.toLowerCase().includes(searchValue.toLowerCase())
  );
  useEffect(() => {
    getArticles();
  }, []);
  console.log('Find post', findPost);
  return (
    <>
      <div className="flex items-center rounded-xl outline outline-lime-600 md:max-w-sm">
        <Input
          placeholder={`Search ${searchKey}...`}
          className="max-h-20 md:max-w-sm"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <BiSearchAlt2 className="h-10 w-10 rounded-r-lg bg-lime-600 p-2 text-white" />
      </div>
      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
        <Table className="relative">
          <TableHeader>
            <TableRow className="border bg-lime-600 pl-5">
              <TableHead className="text-white">Title</TableHead>
              <TableHead className="text-white">Category name</TableHead>
              <TableHead className="text-white">Author</TableHead>
              <TableHead className="text-white">Published on</TableHead>
              <TableHead className="text-white">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {findPost?.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="border pl-4">{post.title}</TableCell>
                <TableCell className="border pl-4">
                  {post.category.name}
                </TableCell>
                <TableCell className="border">Amy Harris</TableCell>
                <TableCell className="border">{post.updatedAt}</TableCell>
                <TableCell>
                  <CellAction id={0} />
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
