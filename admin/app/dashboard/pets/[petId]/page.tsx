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
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [number, setNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
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
    setImageUrl('');
  };

  const handleImageUpload = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      console.log(response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate phone number
      if (number.length < 8) {
        toast.error('Please enter a valid phone number');
        return;
      }

      // Validate description
      if (description.length < 10) {
        toast.error(
          'Please provide a more detailed description (minimum 10 characters)'
        );
        return;
      }

      let uploadedImageUrl = null;
      if (image) {
        uploadedImageUrl = await handleImageUpload();
      }

      const res = await axios.post(`${apiUrl}/api/v1/sos/create`, {
        description,
        location,
        phoneNumber: number,
        imageUrl: uploadedImageUrl
      });

      if (res.status === 201) {
        toast.success('SOS report submitted successfully');
        // Clear form
        setDescription('');
        setLocation('');
        setNumber('');
        setImage(null);
        setPreviewUrl('');
        setImageUrl('');
        // onSubmit();
        router.push('/sos');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Failed to submit SOS report:', error);
      toast.error(
        error.response?.data?.message || 'Failed to submit SOS report'
      );
    } finally {
      setLoading(false);
    }
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
