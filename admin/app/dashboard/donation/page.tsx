'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DonationContext } from '@/components/context/donation-context';
import PageContainer from '@/components/layout/page-container';
import { DonationTable } from '@/components/tables/donation-tables/donation-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { donationPosts } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { PetsContext } from '@/components/context/pets-context';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Donation', link: '/dashboard/donation' }
];

export default function Page() {
  const { refetch } = useContext(PetsContext);
  const { getAllDonationPosts, getDonationPosts } = useContext(DonationContext);

  useEffect(() => {
    getAllDonationPosts();
  }, [refetch]);

  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Donation Posts (${donationPosts.length})`}
            description="Manage donations (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/donation/new'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <DonationTable searchKey="donation" data={donationPosts} />
      </div>
    </PageContainer>
  );
}
