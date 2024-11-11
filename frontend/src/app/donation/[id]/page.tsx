"use client";
import DetailCard, { DonationPay } from "@/components/donation_section/detail";
import { format } from "date-fns";
import DonationCard from "@/components/donation_section/donation_card";
import { useParams } from "next/navigation";
import { DonationContext } from "@/components/context/donation_context";
import { useContext, useEffect } from "react";
import Comments from "@/components/donation_section/comment";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import DonationDetailSkeleton from "./loading";
import Link from "next/link";

export type donationPostsProps = {
  title: string;
  description: string;
  _id: string;
  images: string;
  totalAmount: number;
  updatedAt: Date;
  userId: {
    firstname: string;
    lastname: string;
  };
};
const DonationDetail = () => {
  const { id } = useParams();
  const { fetchSingleDonationPosts, oneDonationPost, donationPosts, loading } =
    useContext(DonationContext);

  const progressPercentage = Math.floor(
    Math.min(
      (oneDonationPost.currentAmount / oneDonationPost.totalAmount) * 100,
      100
    )
  );

  useEffect(() => {
    fetchSingleDonationPosts(id);
  }, [id]);

  if (loading) {
    return <DonationDetailSkeleton />;
  }

  console.log("ODP", oneDonationPost);

  return (
    <div className="bg-gradient-to-b from-slate-50 to-orange-50 py-24 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Stats Bar - Now visible and styled */}
        {/* <div className="bg-white p-6 rounded-xl shadow-lg mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center transform hover:scale-105 transition-transform">
            <p className="text-3xl font-bold text-orange-600">
              {oneDonationPost.donors || 24}
            </p>
            <p className="text-sm text-gray-600">Donors</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform">
            <p className="text-3xl font-bold text-orange-600">
              {oneDonationPost.daysLeft || 15}
            </p>
            <p className="text-sm text-gray-600">Days Left</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform">
            <p className="text-3xl font-bold text-orange-600">
              {oneDonationPost.shares || 5}
            </p>
            <p className="text-sm text-gray-600">Shares</p>
          </div>
          <div className="text-center transform hover:scale-105 transition-transform">
            <p className="text-3xl font-bold text-orange-600">
              {oneDonationPost.comments?.length || 12}
            </p>
            <p className="text-sm text-gray-600">Comments</p>
          </div>
        </div> */}

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <DetailCard />

            {/* Campaign Updates Section - Enhanced */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Campaign Updates
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-4 py-2 bg-orange-50 rounded-r-lg">
                  <p className="font-medium text-lg">{`Milestone: ${progressPercentage}% Achieved!`}</p>
                  <p className="text-gray-600 mt-2">
                    Thanks to our amazing supporters, we are making great
                    progress...
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <Comments />
          </div>

          {/* Right column */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <DonationPay id={id} progressPercentage={progressPercentage} />

              {/* Top Donors Section - Enhanced */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Top Donors
                </h3>
                <div className="space-y-4">
                  {oneDonationPost.collectedDonations
                    ?.slice(0, 3)

                    .sort(
                      (a: { amount: number }, b: { amount: number }) =>
                        b.amount - a.amount
                    )
                    .map((c, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                        <Avatar className="h-12 w-12 border-2 border-orange-200">
                          <AvatarFallback className="bg-orange-100 text-orange-600"></AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800">
                            {c.userName}
                          </p>
                          <p className="text-sm text-orange-600 font-semibold">
                            ${c.amount}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Share Campaign Section - Enhanced */}
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-6 text-gray-800">
                  Share This Campaign
                </h3>
                <div className="flex gap-4 justify-center">
                  <Link
                    className="flex-1 flex items-center gap-2"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}>
                    <Button
                      variant="outline"
                      className=" hover:bg-blue-50 hover:text-blue-600 transition-colors w-full">
                      <FaFacebook className="text-xl" /> Share
                    </Button>
                  </Link>
                  <Link
                    className="flex-1 flex items-center gap-2"
                    href={`https://twitter.com/intent/tweet?url=${window.location.href}`}>
                    <Button
                      variant="outline"
                      className="w-full hover:bg-sky-50 hover:text-sky-600 transition-colors">
                      <FaXTwitter className="text-xl" /> Tweet
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Campaigns section - Enhanced */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Similar Campaigns
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {donationPosts?.slice(0, 3).map((c, i) => (
              <div
                key={i}
                className="transform hover:scale-105 transition-transform">
                <DonationCard
                  {...c}
                  updatedAt={c.updatedAt}
                  collectedDonations={c.collectedDonations || []}
                  userId={c.userId || { firstname: "", lastname: "" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetail;
