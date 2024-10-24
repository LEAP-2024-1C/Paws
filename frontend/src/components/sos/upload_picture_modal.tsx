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

export default function UploadPictureModal() {
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>
        <Button variant="destructive">Upload Image</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Select an image file to upload. The image will be previewed before
            uploading.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="image">Image</Label>
            <Input type="file" id="image" />
          </div>
          <div className="grid gap-2">
            <Label>Preview</Label>
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden flex items-center justify-center">
              <img
                src="/placeholder.svg"
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
          <Button type="submit">Upload</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
