import { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { apiUrl } from '@/utils/util';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUpload } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { PetsContext } from '../context/pets-context';

interface PetFormProps {
  onSubmit: () => void;
}

export default function PetForm({ onSubmit }: PetFormProps) {
  const ages = [
    { age: '1', id: 1 },
    { age: '2', id: 2 },
    { age: '3', id: 3 },
    { age: '4', id: 4 },
    { age: '5', id: 5 },
    { age: '6', id: 6 },
    { age: '7', id: 7 }
  ];
  const [petData, setPetData] = useState({
    id: '',
    name: '',
    breed: '',
    age: '',
    ageGroup: '',
    gender: '',
    healthCondition: '',
    size: '',
    vaccinated: true,
    spayed: true,
    neutered: true,
    wormed: true,
    category: ''
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const { petCategory } = useContext(PetsContext);
  const router = useRouter();

  const changeAgeValue = (e: any) => {
    setPetData({ ...petData, id: e.target.value });
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

      const res = await axios.post(`${apiUrl}/api/v1/pets`, {
        name: petData.name,
        breed: petData.breed,
        age: petData.age,
        ageGroup: petData.ageGroup,
        gender: petData.gender,
        healthCondition: petData.healthCondition,
        size: petData.size,
        vaccinated: petData.vaccinated,
        spayed: petData.spayed,
        wormed: petData.wormed,
        category: petData.category,
        imageUrl: uploadedImageUrl
      });

      if (res.status === 201) {
        toast.success('SOS report submitted successfully');
        // Clear form
        setImage(null);
        setPreviewUrl('');
        setImageUrl('');
        onSubmit();
        router.push('/dashboard/pets');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Failed to create pet profile:', error);
      toast.error(
        error.response?.data?.message || 'Failed to create pet profile'
      );
    } finally {
      setLoading(false);
    }
  };

  // console.log('PDDD', petData);
  // console.log('----', petCategory);

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <Input
        type="text"
        value={petData.name}
        onChange={(e) => setPetData({ ...petData, name: e.target.value })}
        placeholder="Name"
        className="w-full border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />
      <Select onValueChange={(value) => setPetData({ ...petData, age: value })}>
        <SelectTrigger className="">
          <SelectValue placeholder="Age" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ages</SelectLabel>
            {ages?.map((e) => (
              <SelectItem key={e.id} value={e.age}>
                {e.age}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={petData.ageGroup}
        onChange={(e) => setPetData({ ...petData, ageGroup: e.target.value })}
        placeholder="Age Group"
        className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />
      <Input
        type="text"
        value={petData.gender}
        onChange={(e) => setPetData({ ...petData, gender: e.target.value })}
        placeholder="Gender"
        className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />
      <Input
        type="text"
        value={petData.breed}
        onChange={(e) => setPetData({ ...petData, breed: e.target.value })}
        placeholder="Breed"
        className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />
      <Input
        type="text"
        value={petData.healthCondition}
        onChange={(e) =>
          setPetData({ ...petData, healthCondition: e.target.value })
        }
        placeholder="Health condition"
        className="w-full  border p-3 focus:border-transparent focus:ring-2 focus:ring-orange-500"
        required
      />
      <Select
        onValueChange={(value) => setPetData({ ...petData, category: value })}
      >
        <SelectTrigger className="">
          <SelectValue placeholder="Select a pet type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Pet types</SelectLabel>
            {petCategory?.map((e) => (
              <SelectItem key={e._id} value={e._id}>
                {e.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          setPetData({ ...petData, vaccinated: value === 'yes' })
        }
      >
        <SelectTrigger id="vaccinated">
          <SelectValue placeholder="Vaccinated" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="yes">yes</SelectItem>
          <SelectItem value="no">no</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          setPetData({ ...petData, spayed: value === 'yes' })
        }
      >
        <SelectTrigger id="spayed">
          <SelectValue placeholder="Spayed/Neutered" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="yes">yes</SelectItem>
          <SelectItem value="no">no</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) =>
          setPetData({ ...petData, wormed: value === 'yes' })
        }
      >
        <SelectTrigger id="wormed">
          <SelectValue placeholder="Wormed" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="yes">yes</SelectItem>
          <SelectItem value="no">no</SelectItem>
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => setPetData({ ...petData, size: value })}
      >
        <SelectTrigger id="size">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="small">small</SelectItem>
          <SelectItem value="medium">medium</SelectItem>
          <SelectItem value="big">big</SelectItem>
        </SelectContent>
      </Select>

      {/* Image Upload Section */}
      <div className="relative">
        {previewUrl ? (
          <div className="relative h-48 w-full overflow-hidden rounded-xl">
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
          <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 hover:bg-gray-50">
            <FiUpload className="h-8 w-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">Upload an image</span>
            <Input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        )}
      </div>
      <Button
        type="submit"
        disabled={loading}
        className={`self-end px-4 py-3 font-medium text-white transition-colors
          ${
            loading
              ? 'cursor-not-allowed bg-gray-400'
              : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700'
          }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Creating...
          </div>
        ) : (
          'Create '
        )}
      </Button>
    </form>
  );
}
