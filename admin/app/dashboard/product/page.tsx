'use client';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ShoppingContext } from '@/components/context/shopping_context';
import PageContainer from '@/components/layout/page-container';
import { ProductTable } from '@/components/tables/product-tables/product-table';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/constants/data';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Product', link: '/dashboard/product' }
];
export default function Page() {
  const { product } = useContext(ShoppingContext);

  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title={`Products (${product.length})`}
            description="Manage products (Server side table functionalities.)"
          />

          <Link
            href={'/dashboard/product/create'}
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <ProductTable
          data={product as unknown as Product[]}
          searchKey="productName"
        />
      </div>
    </PageContainer>
  );
}
