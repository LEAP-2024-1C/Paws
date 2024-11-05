'use client';
import { PetsContext } from '@/components/context/pets-context';
import { AlertModal } from '@/components/modal/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';

interface CellActionProps {
  id: string;
}

export const CellActionPost: React.FC<CellActionProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { refetch, setRefetch } = useContext(PetsContext);
  const { toast } = useToast();

  const onConfirm = async (id: string) => {
    try {
      const res = await axios.delete(`${apiUrl}/api/v1/adoption/${id}`);
      if (res.status === 200) {
        console.log('Deleted post successfully');
        toast({
          title: 'Deleted post successfully',
          description: `${new Date().toLocaleDateString()}`
        });
        setRefetch?.(!refetch);
      }
    } catch (error) {
      console.log('Failed to delete post', error);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={(id: string) => onConfirm(id)}
        loading={loading}
        id={id}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/adoption/${id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
