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
  currentAmount: number;
  _id: string;
  updatedAt: Date;
  collectedDonations: { amount: number }[];
  userId: {
    firstname: string;
    lastname: string;
  };
  // oneDonationPost: any;
};
const DonationCard = ({
  title,
  _id,
  images,
  totalAmount,
  currentAmount,
  updatedAt,
  collectedDonations,
  userId,
}: // oneDonationPost,
donationPostsProps) => {
  const progressPercentage = Math.floor(
    Math.min((currentAmount / totalAmount) * 100, 100)
  );

  return (
    <Link href={"/donation/" + _id}>
      <Card className="m-auto w-[90%] sm:w-[85%] md:w-[80%] lg:w-[400px] relative p-2 flex flex-col gap-2 lg:gap-3 hover:shadow-xl">
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
          <div className="text-xs sm:text-sm lg:text-lg font-bold">
            <span className="mr-1">
              {userId.firstname.charAt(0).toUpperCase() +
                userId.firstname.slice(1).toLowerCase()}
            </span>
            <span>
              {userId.lastname.charAt(0).toUpperCase() +
                userId.lastname.slice(1).toLowerCase()}
            </span>
          </div>
        </CardContent>

        <CardContent className="p-2 sm:p-3">
          <p className="text-sm sm:text-base text-justify">{title}</p>
        </CardContent>

        <CardTitle className="flex gap-1 lg:gap-3 items-baseline px-2 sm:px-3">
          <p className="text-base sm:text-lg lg:text-2xl">{totalAmount}$</p>
          <p className="text-xs sm:text-sm lg:text-lg">raised out of</p>
          <p className="text-xs sm:text-sm lg:text-xl">{currentAmount}$</p>
        </CardTitle>

        <span className="px-2 sm:px-3">
          <Progress value={progressPercentage} />
        </span>

        <CardFooter className="flex justify-between p-2 sm:p-3">
          <div className="flex items-center gap-1 lg:gap-2">
            <FaHeart className="text-sm sm:text-base text-red-500" />
            <p className="text-xs sm:text-sm 2xl:text-base">
              {collectedDonations?.length}
            </p>
            <p className="text-xs sm:text-sm 2xl:text-base">Contributors</p>
          </div>
          <p className="text-xs sm:text-sm 2xl:text-base">
            {new Date(updatedAt).toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default DonationCard;
