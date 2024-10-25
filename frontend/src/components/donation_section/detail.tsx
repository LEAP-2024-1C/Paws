"use client";

import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Card,
  CardTitle,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { Progress } from "../ui/progress";
import { DialogButton } from "./dialog";
import Link from "next/link";
const DetailCard = () => {
  const [loved, setLoved] = React.useState(false);

  const wishList = () => {
    setLoved(!loved);
  };
  return (
    <Card className="w-[700px] bg-white border-none rounded-xl p-3">
      <CardHeader>
        <img
          src="/images/cat.png"
          alt=""
          className="w-[600px] h-[320px] left-60 border border-0 rounded-lg"
        />
      </CardHeader>
      <CardContent className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-lg font-bold">Aztai sawar</p>
      </CardContent>

      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">
          Every five minutes, someone calls us to report an
        </h1>
        <p className="text-lg">
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
      <CardFooter className="flex gap-3">
        <Button variant="ghost" onClick={wishList} className="p-0">
          {loved ? <VscHeartFilled /> : <VscHeart />}
        </Button>
        <p>24</p>
      </CardFooter>
    </Card>
  );
};

export default DetailCard;

export function DonationPay() {
  return (
    <div className="flex flex-col gap-8 w-[450px] h-[500px] bg-white border-0 rounded-xl p-[30px] ">
      <CardTitle className="text-5xl font-bold">
        Help the dream come true
      </CardTitle>
      <span>
        <Progress value={33} />
      </span>
      <CardTitle className="flex gap-3">
        <p className="text-2xl">100$</p>
        <p className="text-lg">raised out of</p>
        <p className="text-xl">43$</p>
      </CardTitle>
      <Button className="bg-[#FD7E14]">Donate</Button>
      <DialogButton />
      <Link href="/">
        <Button className="border border-2 border-orange-400 bg-white text-black px-[135px]">
          View other Donate
        </Button>
      </Link>
    </div>
  );
}
