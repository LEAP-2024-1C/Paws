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

import { PetsContext } from '../context/pets-context';
import { Textarea } from '../ui/textarea';
import { DonationContext } from '../context/donation-context';
import { ProfileContext } from '../context/profile_context';

interface AdoptionFormProps {
  initialData: any | null;
  pets: any;
  status: any;
}

export const DonationPostForm: React.FC<AdoptionFormProps> = ({
  initialData,
  status
}) => {
  const action = initialData ? 'Save changes' : 'Create';
  const { getPetData } = useContext(PetsContext);
  const { isLoading } = useContext(ProfileContext);
  const { donationPosts, setDonationPosts, createDonationPost } =
    useContext(DonationContext);

  const defaultValues = initialData
    ? initialData
    : {
        status: ''
      };

  // console.log('FD', donationPosts); //olon udaa duudaad bga err zasah

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Create Donation Post" description="Add a new post" />
      </div>
      <Separator />

      <form>
        <div className="mb-4 w-full space-y-8">
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
              return <button onClick={() => open()}>Upload an Image</button>;
            }}
          </CldUploadWidget>
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
              onChange={(e) =>
                setDonationPosts({ ...donationPosts, title: e.target.value })
              }
              placeholder="Title"
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
              onChange={(e) =>
                setDonationPosts({
                  ...donationPosts,
                  totalAmount: Number(e.target.value)
                })
              }
              placeholder="Amount"
              className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Select status</h6>
            <Select
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
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">
              Insert description
            </h6>
            <Textarea
              value={donationPosts.description}
              onChange={(e) =>
                setDonationPosts({
                  ...donationPosts,
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
          onClick={createDonationPost}
        >
          {action}
        </Button>
      </form>
    </>
  );
};
