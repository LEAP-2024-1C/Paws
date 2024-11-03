'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react';
import ProductForm from '@/components/forms/product-form';
import { useRouter } from 'next/dist/client/components/navigation';
const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' },
  { title: 'Create', link: '/dashboard/product/create' }
];

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ProductForm
          categories={[
            { _id: '672445ffaaf072a1332e7108', name: 'Cat' },
            { _id: '6724478d6dd6e64bafae3f78', name: 'Dog' },
            { _id: '6724479f6dd6e64bafae3f7a', name: 'Others' }
          ]}
          onSubmit={() => handleSubmit}
        />
      </div>
    </ScrollArea>
  );
}
