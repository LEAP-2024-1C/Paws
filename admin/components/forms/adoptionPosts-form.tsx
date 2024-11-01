'use client';
import * as z from 'zod';
import { useContext, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
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
import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
import FileUpload from '../file-upload';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { PetsContext } from '../context/pets-context';
import { Textarea } from '../ui/textarea';
const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string()
});
export const IMG_MAX_LIMIT = 3;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Pet Name must be at least 3 characters' }),
  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: 'You can only add up to 3 images' })
    .min(1, { message: 'At least one image must be added.' }),
  description: z.string().min(3, {
    message: 'Adopt request description must be at least 3 characters'
  }),
  price: z.coerce.number(),
  category: z.string().min(1, { message: 'Please select a category' }),
  location: z.string(),
  status: z.string(),
  title: z.string()
});

type adoptionPostsFormValues = z.infer<typeof formSchema>;

interface AdoptionFormProps {
  initialData: any | null;
  pets: any;
  status: any;
}

export const AdoptionPostsForm: React.FC<AdoptionFormProps> = ({
  initialData,
  pets,
  status
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? 'Edit post' : 'Create post';
  const description = initialData ? 'Edit a post.' : 'Add a new post';
  const toastMessage = initialData ? 'Post updated.' : 'Post created.';
  const action = initialData ? 'Save changes' : 'Create';
  const { getPetData } = useContext(PetsContext);

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        price: 0,
        imgUrl: [],
        category: '',
        location: '',
        status: ''
      };

  const form = useForm<adoptionPostsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: adoptionPostsFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        // await axios.post(`/api/products/edit-product/${initialData._id}`, data);
      } else {
        // const res = await axios.post(`/api/products/create-product`, data);
        // console.log("product", res);
      }
      router.refresh();
      router.push(`/dashboard/adoption`);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.'
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/adoption`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
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

  const triggerImgUrlValidation = () => form.trigger('imgUrl');

  const addAdoptionPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/adoption/create`, {
        title: formData.title,
        description: formData.description,
        pet: formData.petId,
        location: formData.location,
        status: formData.status,
        imgUrl: formData.imgUrl
      });
      if (res.status === 201) {
        toast({
          variant: 'default',
          title: 'Successfully posted'
        });
        router.push('/dashboard/adoption');
      }
    } catch (error) {
      console.error('Failed to create pet profile:', error);
    } finally {
      setLoading(false);
    }
  };

  console.log('ID', initialData);
  console.log('FD', formData);

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  {/* <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  /> */}
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
                        <button onClick={() => open()}>Upload an Image</button>
                      );
                    }}
                  </CldUploadWidget>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <form onSubmit={addAdoptionPost}>
        <div className="gap-8 md:grid md:grid-cols-3">
          <div className="">
            <h6 className="mb-3 text-[0.9rem] font-medium">Select a pet</h6>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, petId: value })
              }
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
        <Button disabled={loading} className="ml-auto" type="submit">
          {action}
        </Button>
      </form>
    </>
  );
};
