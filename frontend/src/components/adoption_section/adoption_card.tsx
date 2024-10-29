"use client";
import React, { useContext } from "react";
import { VscHeart } from "react-icons/vsc";
import { VscHeartFilled } from "react-icons/vsc";
import { GrLocationPin } from "react-icons/gr";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

export type adoptionPostsProps = {
  title: string;
  location: string;
  description: string;
  _id: string;
};

export default function AdoptionCard({
  title,
  location,
  description,
  _id,
}: adoptionPostsProps) {
  const [loved, setLoved] = React.useState(false);

  const wishList = () => {
    setLoved(!loved);
  };
  return (
    <Card className="w-[350px] relative">
      <Button
        variant="ghost"
        className="p-0 absolute right-3 top-2 text-2xl hover:scale-150 hover:bg-transparent z-10"
        onClick={wishList}>
        {loved ? <VscHeartFilled /> : <VscHeart />}
      </Button>
      <CardHeader className="mb-4 p-0 h-48">
        <div className="overflow-hidden rounded-t-lg">
          <img
            src="https://res.cloudinary.com/petrescue/image/upload/c_fill,f_auto,g_face,h_500,q_80,w_500/itef4gwj7cgtmt3qmcb4.jpg"
            alt="Sample Image"
            className="rounded-[20px] object-fill scale-105"
          />
        </div>
      </CardHeader>
      <CardContent className="h-40 overflow-hidden mb-3">
        <h1 className="text-2xl mb-2 font-semibold text-[#FD7E14]">{title}</h1>
        <p className="text-justify">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center gap-1 text-base">
          <GrLocationPin />
          <span>{location}</span>
        </div>
        <Link href={"/adoption/" + _id}>
          <Button className="bg-[#FD7E14]">See more</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
