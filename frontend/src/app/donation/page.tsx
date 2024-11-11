"use client";

import DonationCard from "@/components/donation_section/donation_card";
import React, { useContext } from "react";
import DonationHero from "@/components/donation_section/hero";
import { DonationContext } from "@/components/context/donation_context";
// import { format } from "date-fns";

export interface donationPostsProps {
  title: string;
  description: string;
  _id: string;
  images: string;
  totalAmount: number;
  currentAmount: number;
  updatedAt: Date;
  userId: {
    firstname: string;
    lastname: string;
  };
}
const Donation = () => {
  const { donationPosts } = useContext(DonationContext);
  console.log("DonationPosts", donationPosts);

  return (
    <div className="mx-auto">
      <DonationHero />
      <div className="px-4 py-5 md:py-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 w-full md:w-4/5 lg:w-3/4 xl:w-3/5 mx-auto md:gap-6">
          {donationPosts?.map((c, i) => (
            <div
              className="col-span-1 transform hover:scale-105 transition-transform"
              key={i}>
              <DonationCard
                title={c.title}
                userId={c.userId || { firstname: "", lastname: "" }}
                description={c.description}
                _id={c._id}
                images={c.images}
                totalAmount={c.totalAmount}
                currentAmount={c.currentAmount}
                collectedDonations={c.collectedDonations || []}
                updatedAt={c.updatedAt}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donation;
