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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CellActionPost } from './cell-action-post';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { PetsContext } from '@/components/context/pets-context';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface AdoptionPostsTableProps {
  data: adoptionPostss[];
  searchKey: string;
}

interface AdoptionPost {
  _id: string;
  title: string;
  imgUrl: string[];
  created_at: Date;
  status: 'posted' | 'in-progress' | 'adopted';
}

export function AdoptionPostsTable({
  data,
  searchKey
}: AdoptionPostsTableProps) {
  const { refetch, setRefetch } = useContext(PetsContext);
  const [adoptionPosts, setAdoptionPosts] = useState<AdoptionPost[]>([
    {
      _id: '',
      title: '',
      imgUrl: [''],
      created_at: new Date(),
      status: 'posted'
    }
  ]);

  const getAllAdoptionPosts = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/adoption`);
      if (res.status === 200) {
        console.log('RES', res.data);
        setAdoptionPosts(res.data.getAllPosts);
      }
    } catch (error) {
      console.log("Couldn't get adoption posts", error);
    }
  };

  const updateAdoptionPost = async (
    id: string,
    status: AdoptionPost['status']
  ) => {
    try {
      await axios.patch(`${apiUrl}/api/v1/adoption/${id}`, {
        status
      });
      setRefetch?.(!refetch);
    } catch (error) {
      console.log('update err', error);
    }
  };

  useEffect(() => {
    getAllAdoptionPosts();
  }, [refetch]);

  // console.log('POSTS', adoptionPosts);
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
              <TableHead>Avatar</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adoptionPosts.map((post) => (
              <TableRow key={post._id}>
                <TableCell className="pl-5">
                  <Avatar>
                    <AvatarImage src={post.imgUrl[0]} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>
                  {new Date(post.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Select
                    defaultValue="posted"
                    value={post.status}
                    onValueChange={(value) =>
                      updateAdoptionPost(
                        post._id,
                        value as AdoptionPost['status']
                      )
                    }
                  >
                    <SelectTrigger
                      className={`w-[120px] rounded-full px-3 py-1 text-sm font-medium ${
                        post.status === 'posted'
                          ? 'bg-yellow-100 text-yellow-800'
                          : post.status === 'in-progress'
                          ? 'bg-blue-100 text-blue-800'
                          : ' bg-green-100 text-green-800'
                      }`}
                    >
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="posted">Posted</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="adopted">Adopted</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <CellActionPost id={Number(post._id)} />
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
