import { Breadcrumbs } from '@/components/breadcrumbs';
import { DonationPostForm } from '@/components/forms/donationPost-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Donation', link: '/dashboard/donation' },
  { title: 'Create', link: '/dashboard/donation/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <DonationPostForm
          pets={[
            { _id: '1', name: 'Kitty' },
            { _id: '2', name: 'Max' }
          ]}
          status={[
            { _id: '1', name: 'in-progress' },
            { _id: '2', name: 'done' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
