"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useContext, useEffect } from "react";

import { DonationContext } from "@/components/context/donation_context";
import { AdoptionContext } from "@/components/context/adoption_context";

import { CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { PayCard } from "@/components/donation_section/pay_card";

const TransPage = () => {
  const { id } = useParams();
  const { fetchSingleDonationPosts, oneDonationPost } =
    useContext(DonationContext);

  const { fetchAllDonationData } = useContext(DonationContext);
  const { fetchTransactionData, getTransactionData } =
    useContext(AdoptionContext);
  useEffect(() => {
    fetchAllDonationData();
  });
  useEffect(() => {
    fetchSingleDonationPosts(id);
    fetchTransactionData(id);
  }, [id]);

  // Get the amount and format it
  const transactionAmount = getTransactionData?.amount?.toLocaleString() || "0";

  return (
    <div className="mx-auto flex flex-col gap-4 sm:w-4/5 md:3/5 md:gap-8 xl:w-2/6 xl:h-1/2 bg-white border-0 rounded-xl p-[30px] ">
      <CardTitle className="text-xl md:text-3xl xl:text-5xl font-bold">
        Help the dream come true
      </CardTitle>
      <span>
        <Progress value={33} />
      </span>
      <CardTitle className="flex gap-3">
        <p className="text-lg xl:text-2xl">{oneDonationPost.totalAmount}$</p>
        <p className="text-xs xl:text-lg">raised out of</p>
        <p className="text-sm xl:text-xl">{transactionAmount}$</p>
      </CardTitle>

      <PayCard />
      <Link href="/donation">
        <Button className="w-full mx-auto border-2 border-orange-400 bg-white text-black ">
          View other Donate
        </Button>
      </Link>
    </div>
  );
};

export default TransPage;
