"use client";
import * as React from "react";
import { FaHeart } from "react-icons/fa6";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import Link from "next/link";

export type donationPostsProps = {
  title: string;
  description: string;
  images: string;
  totalAmount: number;
  _id: string;
  updateDate: string;
};
const DonationCard = ({
  title,
  _id,
  images,
  totalAmount,
  updateDate,
}: donationPostsProps) => {
  return (
    <Link href={"/donation/" + _id}>
      <Card className="m-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[400px] relative p-2 flex flex-col gap-2 lg:gap-3">
        <CardHeader className="mb-2 lg:mb-4 p-0 h-36 sm:h-40 md:h-44 lg:h-48">
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={images}
              alt="Sample Image"
              className="rounded-[20px] object-cover w-full h-full scale-105"
            />
          </div>
        </CardHeader>

        <CardContent className="flex gap-2 p-2 sm:p-3">
          <Avatar className="w-5 h-5 sm:w-6 sm:h-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-xs sm:text-sm lg:text-lg font-bold">Aztai sawar</p>
        </CardContent>

        <CardContent className="p-2 sm:p-3">
          <p className="text-sm sm:text-base text-justify">{title}</p>
        </CardContent>

        <CardTitle className="flex gap-1 lg:gap-3 items-baseline px-2 sm:px-3">
          <p className="text-base sm:text-lg lg:text-2xl">{totalAmount}$</p>
          <p className="text-xs sm:text-sm lg:text-lg">raised out of</p>
          <p className="text-xs sm:text-sm lg:text-xl">43$</p>
        </CardTitle>

        <span className="px-2 sm:px-3">
          <Progress value={33} />
        </span>

        <CardFooter className="flex justify-between p-2 sm:p-3">
          <div className="flex items-center gap-1 lg:gap-2">
            <FaHeart className="text-sm sm:text-base" />
            <p className="text-xs sm:text-sm 2xl:text-base">25</p>
            <p className="text-xs sm:text-sm 2xl:text-base">Contributors</p>
          </div>
          <p className="text-xs sm:text-sm 2xl:text-base">{updateDate}</p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DonationCard;
