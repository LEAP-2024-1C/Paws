import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import { donationPostsProps } from "../donation_section/donation_card";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const HomeDonationCard = ({ title, images, _id }: donationPostsProps) => {
  return (
    <Link href={`../donation/${_id}`}>
      <Card
        className="border w-[340x] rounded-xl h-full bg-slate-100 hover:brightness-[.70] hover:scale-10"
        key={_id}
      >
        <CardContent
          className="w-full h-[300px] bg-center bg-cover overflow-auto rounded-t-xl"
          style={{ backgroundImage: `url(${images[0]})` }}
        ></CardContent>
        <CardFooter className="flex justify-between min-h-16 px-5 pt-3 shadow-xl rounded-b-xl">
          <h2 className="font-bold text-xl">{title}</h2>
          <p className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center text-amber-600">
            <FaArrowRight />
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default HomeDonationCard;
