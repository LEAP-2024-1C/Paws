// 'use client';
// import * as z from 'zod';
// import { useState } from 'react';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { useForm } from 'react-hook-form';
// import { Trash } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
// } from '@/components/ui/form';
// import { Separator } from '@/components/ui/separator';
// import { Heading } from '@/components/ui/heading';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select';
// // import FileUpload from "@/components/FileUpload";
// import { Textarea } from '../ui/textarea';
// import { FiUpload } from 'react-icons/fi';
// import { IoClose } from 'react-icons/io5';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { apiUrl } from '@/utils/util';

// interface ArticleFormProps {
//   initialData: any | null;
//   articlesCat: any;
//   preChecks: any;
// }

// export const ArticlePostForm: React.FC<ArticleFormProps> = ({
//   initialData,
//   articlesCat,
//   preChecks
// }) => { const [articleData, setArticleData] = useState({
//   title:'',
//   text: '',
//   images: [''],
//   category: '',

// })
//   const params = useParams();
//   const router = useRouter();

//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const title = initialData ? 'Edit post' : 'Create post';
//   const description = initialData ? 'Edit a post.' : 'Add a new post';
//   const toastMessage = initialData ? 'Post updated.' : 'Post created.';
//   const action = initialData ? 'Save changes' : 'Create';
//   const [imageUrl, setImageUrl] = useState('');
//   const [image, setImage] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string>('');

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       if (file.size > 5 * 1024 * 1024) {
//         // 5MB limit
//         toast.error('Image size should be less than 5MB');
//         return;
//       }
//       if (!file.type.startsWith('image/')) {
//         toast.error('Please upload an image file');
//         return;
//       }
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreviewUrl('');
//     setImageUrl('');
//   };

//   const handleImageUpload = async () => {
//     if (!image) return null;
//     const formData = new FormData();
//     formData.append('file', image);
//     formData.append('upload_preset', 'ml_default');

//     try {
//       const response = await axios.post(
//         `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
//         formData
//       );
//       console.log('CL', response.data);
//       return response.data.secure_url;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw new Error('Failed to upload image');
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       let uploadedImageUrl = null;
//       if (image) {
//         uploadedImageUrl = await handleImageUpload();
//       }
//       const res = await axios.post(`${apiUrl}/api/v1/articles`,{
//         title: articleData.title,
//         text: articleData.text,
//         images: articleData.images,
//         category: articleData.category
//           })}
//         catch (error){
//           console.log("ERR", error)
//         }}
//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Heading title={title} description={description} />
//         {initialData && (
//           <Button
//             disabled={loading}
//             variant="destructive"
//             size="sm"
//             onClick={() => setOpen(true)}
//           >
//             <Trash className="h-4 w-4" />
//           </Button>
//         )}
//       </div>
//       <Separator />
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="grid-rows-3\ grid w-full grid-flow-col gap-10 space-y-10 px-20"
//         >
//           <FormField
//             control={form.control}
//             name="imgUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel className="text-lg font-semibold">Images</FormLabel>
//                 {/* Image Upload Section */}
//                 <div className="relative">
//                   {previewUrl ? (
//                     <div className="relative h-48 w-full overflow-hidden rounded-xl">
//                       <Image
//                         src={previewUrl}
//                         alt="Preview"
//                         fill
//                         className="object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={removeImage}
//                         className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
//                       >
//                         <IoClose size={20} />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:bg-gray-50">
//                       <FiUpload className="h-8 w-8 text-gray-400" />
//                       <span className="mt-2 text-sm text-gray-500">
//                         Upload an image
//                       </span>
//                       <Input
//                         type="file"
//                         className="hidden"
//                         accept="image/*"
//                         onChange={handleImageChange}
//                       />
//                     </label>
//                   )}
//                 </div>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <div className="max-w-[600px] gap-8 md:grid md:grid-cols-1">
//             <FormField
//               control={form.control}
//               name="location"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-lg font-semibold">
//                     Article title
//                   </FormLabel>
//                   <FormControl>
//                     <Input
//                       disabled={loading}
//                       placeholder="Article title"
//                       {...field}
//                       className="h-[60px] text-start shadow-lg"
//                       name="title"
//                       // onChange={handlePostValues()}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="category"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-lg font-semibold">
//                     Select a category
//                   </FormLabel>
//                   <Select
//                     disabled={loading}
//                     onValueChange={field.onChange}
//                     value={field.value}
//                     defaultValue={field.value}
//                   >
//                     <FormControl>
//                       <SelectTrigger className="shadow-lg">
//                         <SelectValue
//                           defaultValue={field.value}
//                           placeholder="Select category"
//                         />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {/* @ts-ignore  */}
//                       {articlesCat.map((cat) => (
//                         <SelectItem key={cat._id} value={cat._id}>
//                           {cat.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                     <div className="flex flex-col gap-5">
//                       <FormField
//                         control={form.control}
//                         name="location"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel className="text-lg font-semibold">
//                               Categoy name
//                             </FormLabel>
//                             <FormControl>
//                               <Input
//                                 disabled={loading}
//                                 placeholder="New article category"
//                                 {...field}
//                                 className="h-[60px] text-start shadow-lg"
//                               />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <Button
//                         className="ml-auto w-60 rounded-full bg-lime-700 text-white"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           console.log('CATE ADD');
//                         }}
//                       >
//                         Add Category
//                       </Button>
//                     </div>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel className="text-lg font-semibold">
//                     Description
//                   </FormLabel>
//                   <FormControl className="shadow-lg">
//                     <Textarea placeholder="Type your article description here"></Textarea>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button
//               disabled={loading}
//               className="ml-auto w-60 rounded-full bg-lime-700 text-white"
//               type="submit"
//             >
//               {action}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </>
//   );
// };
