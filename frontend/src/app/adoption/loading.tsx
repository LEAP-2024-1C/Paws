import React from "react";

const AdoptionLoading = () => {
  return (
    <div>
      {/* Hero Section Skeleton */}
      <div className="hidden md:block h-[400px] bg-gray-200 animate-pulse" />

      {/* Stats Section Skeleton */}
      <div className="bg-white py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 w-20 bg-gray-200 animate-pulse mx-auto mb-2" />
              <div className="h-4 w-32 bg-gray-200 animate-pulse mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto my-20">
        {/* Filter Section */}
        <div className="w-full lg:w-1/4 h-[400px] bg-gray-200 animate-pulse rounded-lg" />

        {/* Cards Grid */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionLoading;
