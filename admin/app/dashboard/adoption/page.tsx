'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';

import PageContainer from '@/components/layout/page-container';
import { AdoptionPostsTable } from '@/components/tables/adoption-tables/adoption-post-table';
import { AdoptionTable } from '@/components/tables/adoption-tables/adoption-req-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { adoptionPostss } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Adoption', link: '/dashboard/adoption' }
];

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Adoption Posts (${adoptionPostss.length})`}
            description="Manage adopt posts (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/adoption/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Post
          </Link>
        </div>
        <Separator />

        <AdoptionPostsTable searchKey="adoptionPostss" data={adoptionPostss} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Adoption Requests (${adoptionPostss.length})`}
            description="Manage adopt requests (Server side table functionalities.)"
          />
        </div>

        <AdoptionTable searchKey="adoptionPostss" data={adoptionPostss} />
      </div>
    </PageContainer>
  );
}
