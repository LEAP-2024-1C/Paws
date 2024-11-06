import { Skeleton } from "@/components/ui/skeleton";

export default function DonationDetailSkeleton() {
  return (
    <div className="bg-slate-50 py-12 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Stats Bar Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-2" />
              <Skeleton className="h-4 w-24 mx-auto" />
            </div>
          ))}
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detail Card Skeleton */}
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <Skeleton className="w-full h-[400px]" />
              <div className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>

            {/* Campaign Updates Skeleton */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>

            {/* Comments Skeleton */}
            <div className="bg-white rounded-xl p-6 shadow-md">
              <Skeleton className="h-6 w-32 mb-6" />
              <Skeleton className="h-24 w-full mb-4" />
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16 mt-1" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Donation Widget Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <Skeleton className="h-6 w-48 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-12 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Top Donors Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div>
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share Campaign Skeleton */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="flex gap-4 justify-center">
                  <Skeleton className="h-10 w-28" />
                  <Skeleton className="h-10 w-28" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Campaigns Skeleton */}
        <div className="mt-16">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md">
                <Skeleton className="w-full h-48" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
