import React from "react";

const HomeLoading = () => {
  return (
    <section className="px-4 md:px-6 lg:px-8">
      {/* Hero Section Skeleton */}
      <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />

      {/* Adopt me Section */}
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-7xl">
          <div className="h-8 w-32 bg-gray-200 animate-pulse mb-10" />
          <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* Donation Section */}
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-7xl">
          <div className="h-8 w-32 bg-gray-200 animate-pulse mb-10" />
          <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>

      {/* News & Blogs Section */}
      <div className="h-8 w-48 bg-gray-200 animate-pulse mx-auto mt-16 mb-8" />
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 justify-center max-w-6xl mx-auto mb-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[350px] bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </section>

      {/* Best selling products Section */}
      <div className="h-8 w-48 bg-gray-200 animate-pulse mx-auto mb-8" />
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center max-w-6xl mx-auto mb-20">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-[350px] bg-gray-200 animate-pulse rounded-lg"
          />
        ))}
      </section>
    </section>
  );
};

export default HomeLoading;
