"use client";

import DonationCard from "@/components/donation_section/donation_card";
import React, { useContext } from "react";
import DonationHero from "@/components/donation_section/hero";
import { DonationContext } from "@/components/context/donation_context";
import { format } from "date-fns";

export type donationPostsProps = {
  title: string;
  description: string;
  _id: string;
  images: string;
  totalAmount: number;
  updateDate: number;
};
const Donation = () => {
  const { donationPosts } = useContext(DonationContext);
  console.log("mm", donationPosts);
  return (
    <div className="mx-auto">
      <DonationHero />
      <div className="py-5 md:py-10">
        <div className="grid grid-cols gap-2 md:grid-cols-2 xl:grid-cols-3 md:w-3/5 mx-auto md:my-5 md:gap-6">
          {donationPosts?.map((c, i) => (
            <div className="col-span-1 row-span-1" key={i}>
              <DonationCard
                title={c.title}
                description={c.description}
                _id={c._id}
                images={c.images}
                totalAmount={c.totalAmount}
                updateDate={format(c.updateDate, "dd/MMMM/yyyy")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donation;
