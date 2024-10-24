import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UploadPictureModalProps {
  onImageUploaded: (url: string) => void;
}

export default function UploadPictureModal({
  onImageUploaded,
}: UploadPictureModalProps) {
  const [previewUrl, setPreviewUrl] = useState("/placeholder.svg");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onImageUploaded(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Upload Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-white shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-800">
            Upload Image
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Select an image file to upload. The image will be previewed before
            uploading.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image" className="text-gray-700">
              Image
            </Label>
            <Input
              type="file"
              id="image"
              onChange={handleFileChange}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="grid gap-2">
            <Label className="text-gray-700">Preview</Label>
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src={previewUrl}
                width={400}
                height={225}
                alt="Preview"
                className="object-contain"
                style={{ aspectRatio: "400/225", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Upload
          </Button>
          <DialogClose asChild>
            <Button
              variant="outline"
              className="border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
