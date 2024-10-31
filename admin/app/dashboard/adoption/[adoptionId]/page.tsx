import { Breadcrumbs } from '@/components/breadcrumbs';
import { AdoptionPostsForm } from '@/components/forms/adoptionPosts-form';
// import { adoptionPostsForm } from '@/components/forms/adoptionPostForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Adoption', link: '/dashboard/adoption' },
  { title: 'Create', link: '/dashboard/adoption/create' }
];

export default function Page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <AdoptionPostsForm
          pets={[
            { _id: '1', name: 'Kitty' },
            { _id: '2', name: 'Max' }
          ]}
          status={[
            { _id: '1', name: 'posted' },
            { _id: '2', name: 'in-progress' },
            { _id: '3', name: 'adopted' }
          ]}
          initialData={null}
          key={null}
        />
      </div>
    </ScrollArea>
  );
}
