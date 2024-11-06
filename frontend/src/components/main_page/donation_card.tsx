import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { donationPostsProps } from "../donation_section/donation_card";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export type Card = {
  _id: string;
  imgUrl: string[];
  pet: {
    name: string;
  };
};

const HomeDonationCard = ({ title, images, _id }: donationPostsProps) => {
  return (
    <Link href={`../donation/${_id}`}>
      <div
        className="border w-[340x] rounded-xl h-full bg-slate-100 hover:brightness-[.70] hover:scale-105"
        key={_id}
      >
        <div
          className="w-full h-[300px] bg-center bg-cover overflow-auto rounded-t-xl"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></div>
        <div className="flex justify-between bg-slate-100 min-h-16 px-5 pt-3 shadow-2xl">
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center text-amber-600">
            <FaArrowRight />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default HomeDonationCard;
