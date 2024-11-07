'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PetForm from '@/components/forms/pets-form';
import React from 'react';
import { useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import PageContainer from '@/components/layout/page-container';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Pets', link: '/dashboard/pets' },
  { title: 'Create', link: '/dashboard/pets/create' }
];

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <PageContainer scrollable={true}>
      <div className="m-auto h-full w-2/3 flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl font-semibold">Create Pet Profile</h1>
        <PetForm onSubmit={() => handleSubmit} />
      </div>
    </PageContainer>
  );
}
