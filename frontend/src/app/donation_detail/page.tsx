import DetailCard, { DonationPay } from "@/components/donation_section/detail";
import React from "react";
import Link from "next/link";
import DonationCard from "@/components/donation_section/donation_card";

const DonationDetail = () => {
  const mockData = ["1", "2", "3"];
  return (
    <div className="bg-slate-50 ">
      <div className="w-3/5 flex mx-auto  p-6 gap-20 ">
        <DetailCard />
        <DonationPay />
      </div>
      <div className="py-10">
        <Link href="/donation_detail">
          <div className="grid grid-cols-3 w-3/5 mx-auto my-5 gap-6">
            {mockData?.map((m, i) => (
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

export default DonationDetail;
