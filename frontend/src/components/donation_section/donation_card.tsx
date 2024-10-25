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
import { DialogButton } from "./dialog";
import { Button } from "@/components/ui/button";
const DonationCard = () => {
  return (
    <Card className="w-300px md:w-[280px] lg:w-[300px] xl:w-[400px] relative p-4 flex flex-col lg:gap-3">
      <CardHeader className="mb-4 p-0 h-48">
        <div className="overflow-hidden rounded-t-lg">
          <img
            src="/images/donation.png"
            alt="Sample Image"
            className="rounded-[20px] object-fill scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm lg:text-lg font-bold">Aztai sawar</p>
      </CardContent>

      <CardContent>
        {/* <h1 className="text-2xl mb-2 font-semibold text-[#FD7E14]">Pet Name</h1> */}
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur,
          modi.
        </p>
      </CardContent>

      <CardTitle className="flex gap-1 lg:gap-3">
        <p className="text-lg lg:text-2xl">100$</p>
        <p className="text-sm lg:text-lg">raised out of</p>
        <p className="text-sm lg:text-xl">43$</p>
      </CardTitle>
      <span>
        <Progress value={33} />
      </span>
      <CardFooter className="flex justify-between">
        <div className="flex gap-1 lg:gap-2">
          <FaHeart />
          <p>25</p>
          <p>Contributors</p>
        </div>
        <DialogButton />
      </CardFooter>
    </Card>
  );
};

export default DonationCard;
