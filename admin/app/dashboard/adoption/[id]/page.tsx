'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { AdoptionReqContext } from '@/components/context/adoption-context';
import { AdoptionPostsForm } from '@/components/forms/adoptionPosts-form';
// import { adoptionPostsForm } from '@/components/forms/adoptionPostForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Adoption', link: '/dashboard/adoption' },
  { title: 'Edit', link: '/dashboard/adoption/edit' }
];

export default function Page() {
  const { id } = useParams();
  const { getSingleAdoptionPost } = useContext(AdoptionReqContext);

  useEffect(() => {
    getSingleAdoptionPost(id);
  }, [id]);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <AdoptionPostsForm
          status={[
            { _id: '1', name: 'posted' },
            { _id: '2', name: 'in-progress' },
            { _id: '3', name: 'adopted' }
          ]}
          key={null}
          id={id}
        />
      </div>
    </ScrollArea>
  );
}
