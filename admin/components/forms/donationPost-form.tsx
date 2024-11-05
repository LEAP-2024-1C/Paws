'use client';

import { useContext, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
// import FileUpload from "@/components/FileUpload";

import { Textarea } from '../ui/textarea';
import { DonationContext } from '../context/donation-context';
import { ProfileContext } from '../context/profile_context';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

interface AdoptionFormProps {
  status: any;
  id: string | string[];
}

export const DonationPostForm: React.FC<AdoptionFormProps> = ({
  status,
  id
}) => {
  const { isLoading } = useContext(ProfileContext);
  const { editData, setEditData, editDonationPost } =
    useContext(DonationContext);

  const removeImage = () => {
    setEditData({ ...editData, images: [''] });
  };

  const action = 'Save changes';

  useEffect(() => {
    console.log('Edit data changed:', editData);
  }, [editData]);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={` Edit Donation Post`} description="Add a new post" />
      </div>
      <Separator />

      <div className="relative my-6 w-1/2 space-y-2">
        {editData.images[0] ? (
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
            <Image
              src={editData.images[0]}
              alt="Preview"
              fill
              className="object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
            >
              <IoClose size={20} />
            </button>
          </div>
        ) : (
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:bg-gray-50">
            <FiUpload className="h-8 w-8 text-gray-400" />
            <CldUploadWidget
              uploadPreset="pawchig"
              onSuccess={(result) => {
                const info = result.info as CloudinaryUploadWidgetInfo;
                setEditData({
                  ...editData,
                  images: [info.secure_url]
                });
              }}
            >
              {({ open }) => {
                return (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                  >
                    Upload an Image
                  </button>
                );
              }}
            </CldUploadWidget>
          </label>
        )}
      </div>

      <div className="gap-8 md:grid md:grid-cols-3">
        <div className="">
          <h6 className="mb-3 text-[0.9rem] font-medium">Select a pet</h6>

          <Input
            type="text"
            value={editData.petId?.name}
            className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div className="">
          <h6 className="mb-3 text-[0.9rem] font-medium">Insert a title</h6>

          <Input
            type="text"
            value={editData.title}
            onChange={(e) => {
              setEditData({ ...editData, title: e.target.value });
            }}
            // placeholder="Title"
            className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div className="">
          <h6 className="mb-3 text-[0.9rem] font-medium">
            Insert neccesary donation amount
          </h6>

          <Input
            type="number"
            value={editData.totalAmount}
            onChange={(e) => {
              setEditData({
                ...editData,
                totalAmount: Number(e.target.value)
              });
            }}
            placeholder="Amount"
            className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div className="">
          <h6 className="mb-3 text-[0.9rem] font-medium">Select status</h6>
          <Select
            value={editData.status}
            onValueChange={(value) =>
              setEditData({ ...editData, status: value })
            }
            required
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                {status?.map((e: any) => (
                  <SelectItem key={e.name} value={e.name}>
                    {e.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <h6 className="mb-3 text-[0.9rem] font-medium">Insert description</h6>
          <Textarea
            value={editData.description}
            onChange={(e) => {
              setEditData({
                ...editData,
                description: e.target.value
              });
            }}
            placeholder="Description"
            className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      <Button
        disabled={isLoading}
        className="ml-auto"
        onClick={() => {
          editDonationPost(id as string);
        }}
      >
        {action}
      </Button>
    </>
  );
};
