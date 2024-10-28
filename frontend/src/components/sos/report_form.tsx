import { useState } from "react";
import UploadPictureModal from "./upload_picture_modal";

interface ReportFormProps {
  onSubmit: () => void;
}

export default function ReportForm({ onSubmit }: ReportFormProps) {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [number, setNumber] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ description, location, number, imageUrl });
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <UploadPictureModal onImageUploaded={setImageUrl} />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the danger or situation"
        className="w-full p-2 border rounded-xl"
        rows={4}
        required
      />
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
        className="w-full p-2 border rounded-xl"
        required
      />
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Phone Number"
        className="w-full p-2 border rounded-xl"
        required
      />
      <button
        type="submit"
        className="block mx-auto bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-red-700"
      >
        Submit Report
      </button>
    </form>
  );
}
