'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PetsContext } from '@/components/context/pets-context';
import PageContainer from '@/components/layout/page-container';
import { PetDataTable } from '@/components/tables/pet-tables/data-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { pets } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Pets', link: '/dashboard/pets' }
];

export default function page() {
  const { getPetData } = useContext(PetsContext);
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Pets (${getPetData.length})`}
            description="Manage pet list (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/pets/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <PetDataTable />
      </div>
    </PageContainer>
  );
}
