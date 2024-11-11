"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Map from ".";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: string;
  title?: string;
}

const MapModal = ({ isOpen, onClose, location, title }: MapModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title || "Location"}</DialogTitle>
        </DialogHeader>
        <Map location={location} title={title} />
      </DialogContent>
    </Dialog>
  );
};

export default MapModal;
