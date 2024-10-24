"use client";
import Hero from "@/components/donation_section/hero";
import DonationCard from "@/components/donation_section/donation_card";
import React from "react";
import Link from "next/link";

const Donation = () => {
  const mockData = ["1", "2", "3", "4", "5", "6", "7", "8"];
  return (
    <div>
      <Hero />
      <Link href="/donation_detail">
        <div className="grid grid-cols-4 w-5/6 mx-auto my-5 gap-6">
          {mockData?.map((c, i) => (
            <div className="col-span-1 row-span-1">
              <DonationCard />
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default Donation;
