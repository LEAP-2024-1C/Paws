import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { AdoptionTable } from '@/components/tables/adoption-tables/adoption-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { adoptionPostss } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Adoption', link: '/dashboard/adoption' }
];

export default async function page() {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Adopt Requests (${adoptionPostss.length})`}
            description="Manage adopt requests (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/adoption/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New Post
          </Link>
        </div>
        <Separator />

        <AdoptionTable searchKey="adoptionPostss" data={adoptionPostss} />
      </div>
    </PageContainer>
  );
}
