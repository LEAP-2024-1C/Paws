'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { useToast } from '../ui/use-toast';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { PetsContext } from '../context/pets-context';
import { Textarea } from '../ui/textarea';

interface AdoptionFormProps {
  initialData: any | null;
  pets: any;
  status: any;
}

export const AdoptionPostsForm: React.FC<AdoptionFormProps> = ({
  initialData,
  status
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const action = initialData ? 'Save changes' : 'Create';
  const { getPetData } = useContext(PetsContext);

  const defaultValues = initialData
    ? initialData
    : {
        status: ''
      };

  interface IFormData {
    title: string;
    description: string;
    petId: string;
    location: string;
    status: string;
    imgUrl: string[];
    [key: string]: any;
  }

  const [formData, setFormData] = useState<IFormData>({
    title: '',
    description: '',
    petId: '',
    location: '',
    status: '',
    imgUrl: ['']
  });

  const addAdoptionPost = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add validation
    if (!formData.petId || !formData.status) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select both a pet and a status'
      });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${apiUrl}/api/v1/adoption/create`,
        {
          title: formData.title,
          description: formData.description,
          pet: formData.petId,
          location: formData.location,
          status: formData.status,
          imgUrl: formData.imgUrl
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 201) {
        toast({
          variant: 'default',
          title: 'Successfully posted'
        });
        router.push('/dashboard/adoption');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to create adoption post'
      });
      console.error('Failed to create pet profile:', error);
    } finally {
      setLoading(false);
    }
  };

  // const editAdoptionPost = async (id: string) => {
  //   try {
  //     const res = await axios.put(`${apiUrl}/api/v1/adoption/${id}`, {
  //       title,
  //       description,
  //       location,
  //       status
  //     });
  //   } catch (error) {
  //     console.log('data update err', error);
  //   }
  // };

  console.log('ID', initialData);
  console.log('FD', formData);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Create Post" description="Add a new post" />
        {/* {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
      </div>
      <Separator />

      <form>
        <div className="w-full space-y-8">
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
              return <button onClick={() => open()}>Upload an Image</button>;
            }}
          </CldUploadWidget>
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
        </div>
        <Button
          disabled={loading}
          className="ml-auto"
          onClick={addAdoptionPost}
        >
          {action}
        </Button>
      </form>
    </>
  );
};
