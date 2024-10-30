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
const DetailCard = () => {
  return (
    <Card className=" xl:w-3/6 bg-white border-none rounded-xl p-3">
      <CardHeader>
        <img
          src="/images/cat.png"
          alt=""
          className="w-full left-60 border-0 rounded-lg"
        />
      </CardHeader>
      <CardContent className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-xs md:text-lg font-bold">Aztai sawar</p>
      </CardContent>

      <CardContent>
        <h1 className="text-lg md:text-2xl font-semibold mb-4">
          Every five minutes, someone calls us to report an
        </h1>
        <p className="text-sm md:text-lg">
          As the days grow longer, animal cruelty has fewer places to hide. And
          in summer, the number of cases reaches a terrible peak.  No animal
          deserves heartbreaking abuse. Animals are like us: they feel
          desperation, confusion and terror. They feel every punch, every broken
          bone and every burn.  That’s why, together, we must stand against
          cruelty and continue to be there for the animals who desperately need
          our help now. To rescue them from harm and give them the lives they
          deserve – free from terror and torment and full of care and kindness.
          I'm raising money for Perfect Pets Rescue and your contribution will
          make an impact, whether you donate $5 or $500. Every little bit helps.
          Thank you for your support.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <FaHeart />
          <p>24</p>
          <p>Contributors</p>
        </div>
        <DialogButton />
      </CardFooter>
    </Card>
  );
};

export default DetailCard;

export function DonationPay() {
  return (
    <div className="mx-auto flex flex-col gap-4 sm:w-4/5 md:3/5 md:gap-8 xl:w-2/6 xl:h-1/2 bg-white border-0 rounded-xl p-[30px] ">
      <CardTitle className="text-xl md:text-3xl xl:text-5xl font-bold">
        Help the dream come true
      </CardTitle>
      <span>
        <Progress value={33} />
      </span>
      <CardTitle className="flex gap-3">
        <p className="text-lg xl:text-2xl">100$</p>
        <p className="text-xs xl:text-lg">raised out of</p>
        <p className="text-sm xl:text-xl">43$</p>
      </CardTitle>


      <Link href="/donation">
        <Button className="w-full mx-auto border-2 border-orange-400 bg-white text-black ">
          View other Donate
        </Button>
      </Link>
    </div>
  );
}
