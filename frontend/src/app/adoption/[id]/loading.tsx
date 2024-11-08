import React from "react";

const AdoptionDetailLoading = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] py-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Info Card Skeleton */}
            <div className="bg-gray-200 animate-pulse h-[300px] rounded-lg" />
            {/* Contact Detail Skeleton */}
            <div className="bg-gray-200 animate-pulse h-[200px] rounded-lg" />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Card Skeleton */}
            <div className="bg-gray-200 animate-pulse h-[300px] rounded-lg" />
            {/* More Details Skeleton */}
            <div className="bg-gray-200 animate-pulse h-[200px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetailLoading;
