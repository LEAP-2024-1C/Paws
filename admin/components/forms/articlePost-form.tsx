'use client';
import * as z from 'zod';
import { useState, useContext } from 'react';
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
// import FileUpload from "@/components/FileUpload";
import { Textarea } from '../ui/textarea';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import Image from 'next/image';
import { toast } from 'react-toastify';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from 'next-cloudinary';

interface ArticleFormProps {
  initialData: any | null;
  articlesCat: any;
  preChecks: any;
}
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

export const ArticlePostForm: React.FC<ArticleFormProps> = ({
  initialData,
  articlesCat,
  preChecks
}) => {
  const [newCategory, setNewCategory] = useState({ name: '' });
  const [articleData, setArticleData] = useState({
    title: '',
    text: '',
    images: [''],
    category: ''
  });
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit post' : 'Create post';
  const description = initialData ? 'Edit a post.' : 'Add a new post';
  const toastMessage = initialData ? 'Post updated.' : 'Post created.';
  const action = initialData ? 'Save changes' : 'Create';
  const [imageUrl, setImageUrl] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

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

  type adoptionPostsFormValues = z.infer<typeof formSchema>;

  const form = useForm<adoptionPostsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const handleNewcat = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/articlesCat`, {
        name: newCategory.name
      });
    } catch (error) {
      console.log('failed to create new article category');
      toast.error('failed to create new article category');
    }
  };
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
      console.log('CL', response.data);
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
      let uploadedImageUrl = null;
      if (image) {
        uploadedImageUrl = await handleImageUpload();
      }
      const res = await axios.post(`${apiUrl}/api/v1/articles`, {
        title: articleData.title,
        text: articleData.text,
        images: articleData.images,
        category: articleData.category
      });
      if (res.status === 201) {
        toast.success('Article report submitted successfully');
        setImage(null);
        setPreviewUrl('');
        router.refresh();
      }
    } catch (error) {
      console.log('Failed  to create article post', error);
      toast.error('Failed to create article post');
    } finally {
      setLoading(false);
    }
  };

  console.log('new category name', newCategory);
  console.log('article form', articleData);
  return (
    <>
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
        <form className="md:grid-rows-3\ w-[340px] md:grid md:w-full md:grid-flow-col md:gap-10 md:space-y-10 md:px-20">
          {/* Image Upload Section */}
          <div className="relative">
            <h3 className="mb-2 mt-9 font-semibold">Image</h3>
            {previewUrl ? (
              <div className="relative w-full overflow-hidden rounded-xl md:h-48">
                <Image
                  src={previewUrl}
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
              <label className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:bg-gray-50 md:h-32">
                <FiUpload className="h-8 w-8 text-gray-400" />
                <CldUploadWidget
                  uploadPreset="pawchig"
                  onSuccess={(result) => {
                    const info = result.info as CloudinaryUploadWidgetInfo;
                    setArticleData({
                      ...articleData,
                      images: [info.secure_url]
                    });
                  }}
                >
                  {({ open }) => {
                    return (
                      <button onClick={() => open()}>Upload an Image</button>
                    );
                  }}
                </CldUploadWidget>
              </label>
            )}
          </div>
          <div className="grid gap-4 md:grid md:max-w-[600px] md:grid-cols-1 md:gap-8">
            <div>
              <h2 className="mb-2 mt-5 text-sm font-semibold md:text-lg">
                Article title
              </h2>
              <Input
                type="text"
                value={articleData.title}
                onChange={(e) =>
                  setArticleData({ ...articleData, title: e.target.value })
                }
                placeholder="Title"
                className="border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500 md:w-full"
                required
              />
            </div>
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold md:text-lg">
                      Categoy name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="New article category"
                        className="text-start shadow-lg md:h-[45px] md:w-80"
                        onChange={(e) =>
                          setNewCategory({
                            ...newCategory,
                            name: e.target.value
                          })
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="ml-auto mt-7 bg-lime-700 text-xs text-white md:mt-8 md:h-[45px] md:w-60"
                onClick={handleNewcat}
              >
                Add Category
              </Button>
            </div>

            <h2 className="md:text0lg font-semibold">Select a category</h2>
            <Select
              disabled={loading}
              onValueChange={(value) =>
                setArticleData({ ...articleData, category: value })
              }
            >
              <SelectTrigger className="shadow-lg">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* @ts-ignore  */}
                  {articlesCat?.map((cat) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold md:text-lg">
                    Description
                  </FormLabel>
                  <Textarea
                    placeholder="Type your article description here"
                    className="shadow-lg"
                    required
                    onChange={(e) =>
                      setArticleData({ ...articleData, text: e.target.value })
                    }
                  ></Textarea>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="ml-auto w-40 rounded-full bg-lime-700 text-white md:w-60"
              type="submit"
              onClick={handleSubmit}
            >
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
