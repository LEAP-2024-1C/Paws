'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ArticlePostForm } from '@/components/forms/articlePost-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Articles', link: '/dashboard/articles' },
  { title: 'Create', link: '/dashboard/articles/create' }
];

export default function Page() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articlesCat`);
      setCategories(res.data.articlescat);
      console.log('articles categories', res.data.articlescat);
    } catch (error) {
      console.error(error);
      toast.error('Failed to get fetch articles categories categories');
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <ArticlePostForm
          articlesCat={categories}
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
// function getCategories() {
//   throw new Error('Function not implemented.');
// }
