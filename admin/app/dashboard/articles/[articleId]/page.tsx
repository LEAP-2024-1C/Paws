import { Breadcrumbs } from '@/components/breadcrumbs';
import { DonationPostForm } from '@/components/forms/donationPost-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Articles', link: '/dashboard/articles' },
  { title: 'Create', link: '/dashboard/articles/create' }
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
          preChecks={[
            { _id: '1', name: 'vaccinated' },
            { _id: '2', name: 'wormed' },
            { _id: '3', name: 'spay' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
