"use client";

import { useState } from "react";
import GridCarousel from "@/components/sos/grid_carousel";
import ReportForm from "@/components/sos/report_form";

export default function SOSPage() {
  const [isReportSubmitted, setIsReportSubmitted] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start py-10 min-h-screen">
      <div className="flex flex-col items-center justify-center gap-6 px-4 md:px-8 lg:px-16 max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Animal SOS
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-center">
          Report dangers to pets or animals by uploading an image and providing
          details.
        </p>
        {!isReportSubmitted ? (
          <ReportForm onSubmit={() => setIsReportSubmitted(true)} />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Thank you for your report!
            </h2>
            <p>
              Your submission has been received and will be reviewed shortly.
            </p>
          </div>
        )}
        <h2 className="text-2xl font-semibold mt-8">Recent Reports</h2>
        <GridCarousel />
      </div>
    </div>
  );
}
