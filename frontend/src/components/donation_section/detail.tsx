"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { FaHeart } from "react-icons/fa6";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "../ui/progress";
import { DialogButton } from "./dialog";
import Link from "next/link";
import { PayCard } from "./pay/pay_card";
import { DonationContext } from "../context/donation_context";
import { format } from "date-fns";
const DetailCard = ({ id }: { id: string | string[] }) => {
  const { oneDonationPost } = React.useContext(DonationContext);

  return (
    <Card className="bg-white border-none rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-[400px]">
          <img
            src={oneDonationPost.images}
            alt={oneDonationPost.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {oneDonationPost.title}
            </h1>
            <div className="flex items-center gap-3 text-white">
              <Avatar className="border-2 border-white">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Aztai sawar</p>
                <p className="text-sm opacity-75">
                  {format(oneDonationPost.updateDate, "MMMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {oneDonationPost.description}
        </p>
      </CardContent>

      <CardFooter className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <div className="flex items-center gap-3 text-gray-600">
          <FaHeart className="text-red-500" />
          <span className="font-medium">24 Contributors</span>
        </div>
        <DialogButton />
      </CardFooter>
    </Card>
  );
};
export default DetailCard;
export function DonationPay({
  id,
  progressPercentage,
}: {
  id: string | string[];
  progressPercentage: number;
}) {
  const { oneDonationPost } = React.useContext(DonationContext);

  // Calculate progress percentage

  return (
    <div className="mx-auto flex flex-col gap-4 md:gap-8 bg-white border-0 rounded-xl p-[30px] ">
      <CardTitle className="text-xl md:text-3xl xl:text-5xl font-bold">
        Help the dream come true
      </CardTitle>
      <span>
        <Progress value={progressPercentage} className="h-3" />
      </span>
      <CardTitle className="flex gap-3">
        <p className="text-lg xl:text-2xl">{oneDonationPost.totalAmount}$</p>
        <p className="text-xs xl:text-lg">raised out of</p>
        <p className="text-sm xl:text-xl">{oneDonationPost.currentAmount}$</p>
      </CardTitle>

      <PayCard id={id} />
      <Link href="/donation">
        <Button className="w-full mx-auto border-2 border-orange-400 bg-white text-black hover:bg-orange-400 hover:text-white rounded-lg">
          View other Donation Posts
        </Button>
      </Link>
    </div>
  );
}
