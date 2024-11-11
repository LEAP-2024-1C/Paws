'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from '@/components/ui/select';
import { apiUrl } from '@/utils/util';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { FiUpload } from 'react-icons/fi';
import { CloudinaryUploadWidgetInfo } from 'next-cloudinary';
import { CldUploadWidget } from 'next-cloudinary';

interface ProductFormProps {
  onSubmit: () => void;
  categories: any;
}

export default function ProductForm({
  onSubmit,
  categories
}: ProductFormProps) {
  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    description: '',
    images: [''],
    category: '',
    quantity: 0
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const removeImage = () => {
    setProductData((prevData) => ({
      ...prevData,
      images: ['']
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/v1/products/create`, {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        images: productData.images,
        quantity: productData.quantity
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Product created successfully');
        setProductData({
          name: '',
          price: 0,
          description: '',
          images: [''],
          category: '',
          quantity: 0
        });
        router.push('/dashboard/product');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Failed to create product:', error);

      if (error.response) {
        toast.error(error.response.data.message || 'Failed to create product');
      } else if (error.request) {
        toast.error('No response from server. Please check your connection.');
      } else {
        toast.error('An error occurred while creating the product');
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(productData);

  return (
    <form className="w-full max-w-3xl space-y-6 rounded-xl bg-white p-8 shadow-md">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Product Name
        </label>
        <Input
          value={productData.name}
          onChange={(e) =>
            setProductData({ ...productData, name: e.target.value })
          }
          placeholder="Enter product name"
          className="w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          <Input
            type="number"
            value={productData.quantity}
            onChange={(e) =>
              setProductData({
                ...productData,
                quantity: Number(e.target.value)
              })
            }
            placeholder="Enter quantity"
            className="w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Price</label>
          <Input
            type="text"
            value={productData.price}
            onChange={(e) =>
              setProductData({ ...productData, price: Number(e.target.value) })
            }
            placeholder="Enter price"
            className="w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={productData.description}
          onChange={(e) =>
            setProductData({ ...productData, description: e.target.value })
          }
          placeholder="Enter product description"
          className="min-h-[100px] w-full resize-none rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <Select
          onValueChange={(value) =>
            setProductData({ ...productData, category: value })
          }
        >
          <SelectTrigger className="w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories?.map((category: any) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Product Image
        </label>
        <div className="relative">
          {productData.images[0] ? (
            <div className="group relative h-64 w-full overflow-hidden rounded-xl border-2 border-gray-200">
              <Image
                src={productData.images[0]}
                alt="Product preview"
                fill
                className="rounded-xl object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={removeImage}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
                  type="button"
                >
                  <IoClose size={18} />
                  Remove Image
                </button>
              </div>
            </div>
          ) : (
            <label className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-all hover:border-orange-500 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center space-y-3">
                <FiUpload className="h-10 w-10 text-gray-400" />
                <div className="flex flex-col items-center justify-center space-y-2">
                  <span className="text-sm font-medium text-gray-600">
                    Click to upload an image
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, JPEG up to 10MB
                  </span>
                </div>
              </div>
              <CldUploadWidget
                uploadPreset="pawchig"
                onSuccess={(result) => {
                  const info = result.info as CloudinaryUploadWidgetInfo;
                  setProductData((prevData) => ({
                    ...prevData,
                    images: [info.secure_url]
                  }));
                }}
              >
                {({ open }) => (
                  <button
                    type="button"
                    onClick={() => open()}
                    className="absolute inset-0 h-full w-full cursor-pointer"
                  />
                )}
              </CldUploadWidget>
            </label>
          )}
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full rounded-lg py-3 font-medium text-white transition-colors
          ${
            loading
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
          }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Creating...
          </div>
        ) : (
          'Create Product'
        )}
      </Button>
    </form>
  );
}
