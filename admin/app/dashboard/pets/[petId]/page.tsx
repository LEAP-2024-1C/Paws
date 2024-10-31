'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PetForm from '@/components/forms/pets-form';
import { ProductForm } from '@/components/forms/product-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiUrl } from '@/utils/util';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import 'react-phone-input-2/lib/style.css';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Pets', link: '/dashboard/pets' },
  { title: 'Create', link: '/dashboard/pets/create' }
];

export default function Page() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  };
  return (
    <ScrollArea className="m-auto h-full w-1/2">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <h1 className="text-4xl font-semibold">Create Pet Profile</h1>
        <PetForm onSubmit={() => handleSubmit} />
      </div>
    </ScrollArea>
  );
}
