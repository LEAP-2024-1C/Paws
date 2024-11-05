'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DonationContext } from '@/components/context/donation-context';
import { DonationPostForm } from '@/components/forms/donationPost-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Donation', link: '/dashboard/donation' },
  { title: 'Edit', link: '/dashboard/donation/edit' }
];

export default function Page() {
  const { id } = useParams();
  const { getSingleDonationPost } = useContext(DonationContext);

  useEffect(() => {
    getSingleDonationPost(id);
  }, [id]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <DonationPostForm
          status={[
            { _id: '1', name: 'in-progress' },
            { _id: '2', name: 'done' }
          ]}
          key={null}
          id={id}
        />
      </div>
    </ScrollArea>
  );
}
