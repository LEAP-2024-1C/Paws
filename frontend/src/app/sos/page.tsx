"use client";

import { useEffect } from "react";
import UploadPictureModal from "@/components/sos/upload_picture_modal";
import GridCarousel from "@/components/sos/grid_carousel";

export default function SOSPage() {
  useEffect(() => {
    console.log("SOSPage");
  }, []);

  return (
    <div className="flex flex-col items-center justify-start py-10 h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">SOS</h1>
        <p className="text-lg">
          If you are in danger, please press the button below to call the
          police.
        </p>
        <UploadPictureModal />
        <GridCarousel />
      </div>
    </div>
  );
}
