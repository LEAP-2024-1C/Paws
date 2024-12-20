'use client';

import { useContext, useEffect, useState } from 'react';
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
import { Textarea } from '../ui/textarea';
import { AdoptionReqContext } from '../context/adoption-context';
import { ProfileContext } from '../context/profile_context';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

interface AdoptionFormProps {
  status: any;
  id: string | string[];
}

export const AdoptionPostsForm: React.FC<AdoptionFormProps> = ({
  status,
  id
}) => {
  const { isLoading } = useContext(ProfileContext);
  const { editAdoptionPost, setEditAdoptionPost, editAdoptionPostFunc } =
    useContext(AdoptionReqContext);
  useEffect(() => {
    console.log('Edit data changed:', editAdoptionPost);
  }, [editAdoptionPost]);

  const removeImage = () => {
    setEditAdoptionPost({ ...editAdoptionPost, imgUrl: [''] });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Edit The Post" description="Edit adoption post" />
      </div>
      <Separator />

      <form>
        <div className="relative my-6 w-1/2 space-y-2">
          {editAdoptionPost.imgUrl[0] ? (
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={editAdoptionPost.imgUrl[0]}
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
                  setEditAdoptionPost({
                    ...editAdoptionPost,
                    imgUrl: [info.secure_url]
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
                      Change an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
            </label>
          )}
        </div>

        <div className="gap-8 md:grid md:grid-cols-3">
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Pet Name</h6>

            <Input
              disabled={true}
              type="text"
              value={editAdoptionPost?.pet?.name}
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Edit a title</h6>
            <Input
              type="text"
              value={editAdoptionPost?.title}
              onChange={(e) =>
                setEditAdoptionPost({
                  ...editAdoptionPost,
                  title: e.target.value
                })
              }
              placeholder="Title"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Edit location</h6>
            <Input
              type="text"
              value={editAdoptionPost?.location}
              onChange={(e) =>
                setEditAdoptionPost({
                  ...editAdoptionPost,
                  location: e.target.value
                })
              }
              placeholder="Location"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Change status</h6>
            <Select
              value={editAdoptionPost.status}
              onValueChange={(value) =>
                setEditAdoptionPost({ ...editAdoptionPost, status: value })
              }
              required
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Change status" />
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
          <div className="col-span-2">
            <h6 className="mb-3 text-[0.9rem] font-medium">Edit description</h6>
            <Textarea
              value={editAdoptionPost?.description}
              onChange={(e) =>
                setEditAdoptionPost({
                  ...editAdoptionPost,
                  description: e.target.value
                })
              }
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
            editAdoptionPostFunc(id as string);
          }}
        >
          Save Changes
        </Button>
      </form>
    </>
  );
};
