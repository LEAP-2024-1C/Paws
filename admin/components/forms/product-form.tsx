'use client';
import { useState, useContext } from 'react';
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
    imageUrl: [''],
    category: '',
    quantity: 0
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl('');
    setProductData({ ...productData, imageUrl: [''] });
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
        imageUrl: productData.imageUrl,
        quantity: productData.quantity
      });

      if (response.status === 201 || response.status === 200) {
        toast.success('Product created successfully');
        setProductData({
          name: '',
          price: 0,
          description: '',
          imageUrl: [''],
          category: '',
          quantity: 0
        });
        setPreviewUrl('');
        // onSubmit();
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
    <form className="w-full space-y-4">
      <Input
        value={productData.name}
        onChange={(e) =>
          setProductData({ ...productData, name: e.target.value })
        }
        placeholder="Product name"
        className="w-full border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />
      <Input
        type="number"
        value={productData.quantity}
        onChange={(e) =>
          setProductData({ ...productData, quantity: Number(e.target.value) })
        }
        placeholder="Quantity"
        className="w-full border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />

      <Input
        value={productData.description}
        onChange={(e) =>
          setProductData({ ...productData, description: e.target.value })
        }
        placeholder="Product description"
        className="w-full border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />

      <Input
        type="number"
        value={productData.price}
        onChange={(e) =>
          setProductData({ ...productData, price: Number(e.target.value) })
        }
        placeholder="Price"
        className="w-full border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />

      <Select
        onValueChange={(value) =>
          setProductData({ ...productData, category: value })
        }
      >
        <SelectTrigger className="">
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
      {/* Image Upload Section */}
      <div className="relative">
        <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:bg-gray-50">
          <FiUpload className="h-8 w-8 text-gray-400" />
          <CldUploadWidget
            uploadPreset="pawchig"
            onSuccess={(result) => {
              const info = result.info as CloudinaryUploadWidgetInfo;
              setProductData({
                ...productData,
                imageUrl: [info.secure_url]
              });
            }}
          >
            {({ open }) => {
              return <button onClick={() => open()}>Upload an Image</button>;
            }}
          </CldUploadWidget>
        </label>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading}
        className={`self-end px-4 py-3 font-medium text-white transition-colors
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
          'Create'
        )}
      </Button>
    </form>
  );
}
