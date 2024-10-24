"use client";

import DonationCard from "@/components/donation_section/donation_card";
import React from "react";
import Link from "next/link";
import DonationHero from "@/components/donation_section/hero";

const Donation = () => {
  const mockData = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return (
    <div>
      <DonationHero />
      <div className="py-10">
        <Link href="/donation_detail">
          <div className="grid grid-cols-3 w-3/5 mx-auto my-5 gap-6">
            {mockData?.map((c, i) => (
              <div className="col-span-1 row-span-1">
                <DonationCard />
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Donation;
