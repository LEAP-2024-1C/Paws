'use client';

import { useContext } from 'react';
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
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo
} from 'next-cloudinary';
// import FileUpload from "@/components/FileUpload";

import { PetsContext } from '@/components/context/pets-context';
import { Textarea } from '@/components/ui/textarea';
import { DonationContext } from '@/components/context/donation-context';
import { ProfileContext } from '@/components/context/profile_context';
import { FiUpload } from 'react-icons/fi';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

export default function Page() {
  const status = [
    { _id: '1', name: 'in-progress' },
    { _id: '2', name: 'done' }
  ];
  const { getPetData } = useContext(PetsContext);
  const { isLoading } = useContext(ProfileContext);
  const { donationPosts, setDonationPosts, createDonationPost, isEdit } =
    useContext(DonationContext);

  const removeImage = () => {
    setDonationPosts({ ...donationPosts, images: [''] });
  };

  const action = 'Create';

  return (
    <div className="space-y-4 p-8">
      <form onSubmit={createDonationPost}>
        <div className="flex flex-1 items-center justify-between ">
          <Heading
            title={`Create Donation Post`}
            description="Add a new post"
          />
        </div>
        <Separator />

        <div className="relative my-6 w-1/2 space-y-2">
          {donationPosts.images[0] ? (
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={donationPosts.images[0]}
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
                  setDonationPosts({
                    ...donationPosts,
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

            <Select
              onValueChange={(value) =>
                setDonationPosts({ ...donationPosts, petId: value })
              }
              required
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a pet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Pet name</SelectLabel>
                  {getPetData?.map((e) => (
                    <SelectItem key={e._id} value={e._id}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Insert a title</h6>

            <Input
              type="text"
              value={donationPosts.title}
              onChange={(e) => {
                setDonationPosts({ ...donationPosts, title: e.target.value });
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
              value={donationPosts.totalAmount}
              onChange={(e) => {
                setDonationPosts({
                  ...donationPosts,
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
              value={donationPosts.status}
              onValueChange={(value) =>
                setDonationPosts({ ...donationPosts, status: value })
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
          <div className="md:col-span-2">
            <h6 className="mb-3 text-[0.9rem] font-medium">
              Insert description
            </h6>
            <Textarea
              value={donationPosts.description}
              onChange={(e) => {
                setDonationPosts({
                  ...donationPosts,
                  description: e.target.value
                });
              }}
              placeholder="Description"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>
      </form>

      <Button
        disabled={isLoading}
        className="ml-auto"
        onClick={createDonationPost}
      >
        {action}
      </Button>
    </div>
  );
}
