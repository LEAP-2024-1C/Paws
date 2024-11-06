import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "@/utils/util";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface ReportFormProps {
  onSubmit: () => void;
}

const DISTRICTS = [
  { mn: "Баянзүрх", en: "Bayanzurkh" },
  { mn: "Баянгол", en: "Bayangol" },
  { mn: "Сонгинохайрхан", en: "Songinokhairkhan" },
  { mn: "Чингэлтэй", en: "Chingeltei" },
  { mn: "Сүхбаатар", en: "Sukhbaatar" },
  { mn: "Хан-Уул", en: "Khan-Uul" },
  { mn: "Налайх", en: "Nalaikh" },
  { mn: "Багануур", en: "Baganuur" },
  { mn: "Багахангай", en: "Bagakhangai" },
];

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("Image size should be less than 10MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
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
    setPreviewUrl("");
  };

  const handleImageUpload = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "pawchig");

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      console.log(response.data);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate phone number
      if (number.length < 8) {
        toast.error("Please enter a valid phone number");
        return;
      }

      // Validate description
      if (description.length < 5) {
        toast.error(
          "Please provide a more detailed description (minimum 5 characters)"
        );
        return;
      }

      let uploadedImageUrl = null;
      if (image) {
        uploadedImageUrl = await handleImageUpload();
      }

      const res = await axios.post(`${apiUrl}/api/v1/sos/create`, {
        title: "SOS Report",
        description,
        location,
        phoneNumber: number,
        imageUrl: uploadedImageUrl,
      });

      if (res.status === 201) {
        toast.success("SOS report submitted successfully");
        // Clear form
        setDescription("");
        setLocation("");
        setNumber("");
        setImage(null);
        setPreviewUrl("");
        onSubmit();
        router.push("/sos");
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to submit SOS report:", error);
      toast.error("Failed to submit SOS report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex-1">
      {/* Image Upload Section */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Upload Image
        </label>
        <div className="relative">
          {previewUrl ? (
            <div className="relative w-full h-32 rounded-md overflow-hidden">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-black hover:bg-red-600"
              >
                <IoClose size={20} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
              <FiUpload className="w-6 h-6 text-gray-400" />
              <span className="mt-2 text-sm text-gray-500">
                Upload an image
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the emergency situation in detail..."
          className="w-full  text-black p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          rows={3}
          required
          minLength={10}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full text-black p-2 border rounded-md focus:ring-orange-500 focus:border-orange-500"
          required
        >
          <option value="">Select district / Дүүрэг сонгох</option>
          {DISTRICTS.map((district) => (
            <option key={district.en} value={district.en}>
              {district.mn} / {district.en}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Contact Information
        </label>
        <PhoneInput
          country={"mn"}
          value={number}
          onChange={(phone) => setNumber(phone)}
          inputClass="!w-full !p-2 !rounded-md text-left !pl-12"
          containerClass="!w-full"
          buttonClass="!rounded-l-md"
          inputStyle={{ color: "black", textAlign: "left" }}
          placeholder="Enter your phone number"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Submitting...
            </div>
          ) : (
            "Submit Report"
          )}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        For immediate assistance, call our emergency hotline: <br />
        <span className="font-semibold">+976 7777-7777</span>
      </div>
    </form>
  );
}
