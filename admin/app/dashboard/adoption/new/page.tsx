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
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '@/components/ui/use-toast';
import { PetsContext } from '@/components/context/pets-context';
import { Textarea } from '@/components/ui/textarea';
import { AdoptionReqContext } from '@/components/context/adoption-context';
import { ProfileContext } from '@/components/context/profile_context';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';

export default function Page() {
  const status = [
    { _id: '1', name: 'posted' },
    { _id: '2', name: 'in-progress' },
    { _id: '3', name: 'adopted' }
  ];
  const { getPetData } = useContext(PetsContext);
  const { formData, setFormData, addAdoptionPost } =
    useContext(AdoptionReqContext);
  const { isLoading } = useContext(ProfileContext);

  const removeImage = () => {
    setFormData({ ...formData, imgUrl: [''] });
  };

  return (
    <div className="space-y-4 p-8">
      <div className="flex items-center justify-between">
        <Heading title="Create Post" description="Add a new post" />
      </div>
      <Separator />

      <form>
        <div className="relative mb-4 space-y-2">
          {formData.imgUrl[0] ? (
            <div className="relative h-48 w-full overflow-hidden rounded-xl">
              <Image
                src={formData.imgUrl[0]}
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
                  setFormData({
                    ...formData,
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
                setFormData({ ...formData, petId: value })
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Title"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="row-span-2">
            <h6 className="mb-3 text-[0.9rem] font-medium">
              Insert description
            </h6>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Description"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Select a pet</h6>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
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
            <h6 className="mb-3 text-[0.9rem] font-medium">Insert location</h6>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Location"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>
        <Button
          disabled={isLoading}
          className="ml-auto mt-6"
          onClick={addAdoptionPost}
        >
          Create
        </Button>
      </form>
    </div>
  );
}
