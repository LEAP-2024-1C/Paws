"use client";
import DetailCard, { DonationPay } from "@/components/donation_section/detail";

import Link from "next/link";
import DonationCard from "@/components/donation_section/donation_card";
import { useParams } from "next/navigation";
import { DonationContext } from "@/components/context/donation_context";
import { useContext, useEffect } from "react";
// import Comments from "@/components/donation_section/comment";

export type donationPostsProps = {
  title: string;
  description: string;
  _id: string;
  images: string;
  totalAmount: number;
  updateDate: number;
};
const DonationDetail = () => {
  const mockData = ["1", "2", "3"];
  const { id } = useParams();
  const { fetchSingleDonationPosts, oneDonationPost } =
    useContext(DonationContext);

  const { donationPosts, fetchAllDonationData } = useContext(DonationContext);
  useEffect(() => {
    fetchAllDonationData();
  });
  useEffect(() => {
    fetchSingleDonationPosts(id);
  }, [id]);

  console.log("ID", id);
  return (
    <div className="bg-slate-50 ">
      <div className="w-3/4 flex-col flex xl:flex-row mx-auto  p-6 gap-20 ">
        <DetailCard />
        <DonationPay />
        {/* <Comments /> */}
      </div>
      <div className="py-10">
        <Link href="/donation_detail">
          <div className="grid lg:grid-cols-2 md:w-3/4 xl:grid-cols-3 lg:w-3/4 mx-auto md:my-5 gap-6">
            {donationPosts?.map((c, i) => (
              <div className="col-span-1 row-span-1" key={i}>
                <DonationCard
                  title={c.title}
                  description={c.description}
                  _id={c._id}
                  images={c.images}
                  totalAmount={c.totalAmount}
                  updateDate={c.updateDate}
                />
              </div>
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DonationDetail;
