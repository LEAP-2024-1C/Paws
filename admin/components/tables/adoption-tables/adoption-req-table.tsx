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
import { CellAction } from './cell-action';

interface AdoptionPostsTableProps {
  data: adoptionPostss[];
  searchKey: string;
}

interface IAdoptionRequest {
  _id: string;
  description: string;
  title: string;
  previousPetOwnership: boolean;
  currentPets: boolean;
  householdMembers: boolean;
  ageRanges: {
    under5: boolean;
    age5to12: boolean;
    age13to17: boolean;
    age18plus: boolean;
  };
  created_at: Date;
  status: 'pending' | 'accepted' | 'refused';
  petId: string;
}

export function AdoptionTable({ data, searchKey }: AdoptionPostsTableProps) {
  const { refetch, setRefetch } = useContext(PetsContext);
  const [adoptionRequests, setAdoptionRequests] = useState<IAdoptionRequest[]>([
    {
      _id: '',
      description: '',
      title: '',
      previousPetOwnership: true,
      currentPets: true,
      householdMembers: true,
      ageRanges: {
        under5: false,
        age5to12: false,
        age13to17: false,
        age18plus: false
      },
      created_at: new Date(),
      status: 'pending',
      petId: ''
    }
  ]);

  const getAllAdoptionRueqests = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/adoption/req`);
      if (res.status === 200) {
        console.log('RES', res.data);
        setAdoptionRequests(res.data.getAllRequests);
      }
    } catch (error) {
      console.log("Couldn't get adoption requests", error);
    }
  };

  const updateAdoptionRequest = async (
    id: string,
    status: IAdoptionRequest['status']
  ) => {
    try {
      await axios.patch(`${apiUrl}/api/v1/adoption/req/${id}`, {
        status
      });
      setRefetch?.(!refetch);
    } catch (error) {
      console.log('update err', error);
    }
  };

  useEffect(() => {
    getAllAdoptionRueqests();
  }, [refetch]);

  console.log('POSTS', adoptionRequests);
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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adoptionRequests.map((req) => (
              <TableRow key={req._id}>
                <TableCell>{req.description}</TableCell>
                <TableCell>{req.petId}</TableCell>
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
                          ? 'bg-blue-100 text-blue-800'
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
                  <CellAction id={Number(req._id)} />
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
