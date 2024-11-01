'use client';
import * as z from 'zod';
import { useState } from 'react';
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
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
// import FileUpload from "@/components/FileUpload";
import { useToast } from '../ui/use-toast';
import FileUpload from '../file-upload';
import { Textarea } from '../ui/textarea';
import { CldUploadWidget } from 'next-cloudinary';

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
  preCheck: z.string()
});

type DonationPostFormValues = z.infer<typeof formSchema>;

interface ArticleFormProps {
  initialData: any | null;
  articlesCat: any;
  preChecks: any;
}

export const ArticlePostForm: React.FC<ArticleFormProps> = ({
  initialData,
  articlesCat,
  preChecks
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

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        price: 0,
        imgUrl: [],
        category: '',
        location: '',
        preCheck: ''
      };

  const form = useForm<DonationPostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: DonationPostFormValues) => {
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

  const triggerImgUrlValidation = () => form.trigger('imgUrl');

  // const [formData, setFormData] = useState()

  // const addProducts = () =>{
  //   const res = fetch('http:/localhost:8000', {
  //     method :'Post',
  //     body:

  //   })
  // }

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
          className="grid-rows-3\ grid w-full grid-flow-col gap-10 space-y-10 px-20"
        >
          <FormField
            control={form.control}
            name="imgUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">Images</FormLabel>
                <FormControl>
                  {/* <FileUpload
                    onChange={field.onChange}
                    value={field.value}
                    onRemove={field.onChange}
                  /> */}
                </FormControl>
                {/* <div>
                  <CldUploadWidget
                    uploadPreset="adminarticle"
                    onSuccess={(result) => {
                      console.log('Url', result?.info?.secure_url!);
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button onClick={() => open()}>Upload an Image</button>
                      );
                    }}
                  </CldUploadWidget>
                </div> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="max-w-[600px] gap-8 md:grid md:grid-cols-1">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Article title
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Article title"
                      {...field}
                      className="h-[60px] text-start shadow-lg"
                      name="title"
                      // onChange={handlePostValues()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Select a category
                  </FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="shadow-lg">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {articlesCat.map((cat) => (
                        <SelectItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                    <div className="flex flex-col gap-5">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-lg font-semibold">
                              Categoy name
                            </FormLabel>
                            <FormControl>
                              <Input
                                disabled={loading}
                                placeholder="New article category"
                                {...field}
                                className="h-[60px] text-start shadow-lg"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="ml-auto w-60 rounded-full bg-lime-700 text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log('CATE ADD');
                        }}
                      >
                        Add Category
                      </Button>
                    </div>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Description
                  </FormLabel>
                  <FormControl className="shadow-lg">
                    <Textarea placeholder="Type your article description here"></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="ml-auto w-60 rounded-full bg-lime-700 text-white"
              type="submit"
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
