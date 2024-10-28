'use client';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Pets } from '@/constants/data';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PetDataTable } from './data-table';

interface PetProps {
  data: Pets[];
}

export const Pet: React.FC<PetProps> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Users (${data.length})`}
          description="Manage users (Client side table functionalities.)"
        />
        <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <PetDataTable searchKey="name" data={data} />
    </>
  );
};
