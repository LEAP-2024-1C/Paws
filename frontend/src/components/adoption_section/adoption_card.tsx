"use client";
import React from "react";

// import { VscHeart, VscHeartFilled } from "react-icons/vsc";
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
  // title: string;
  location: string;
  description: string;
  _id: string;
  // imgUrl: string[];
  pet: {
    name: string;
    imageUrl: string[];
  };
};

export default function AdoptionCard({
  location,
  description,
  _id,
  pet,
}: adoptionPostsProps) {
  // const [loved, setLoved] = React.useState(false);

  // const wishList = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setLoved(!loved);
  // };

  // const handleCardClick = () => {
  //   router.prefetch(`/adoption/${_id}`);
  //   router.push(`/adoption/${_id}`);
  // };

  return (
    <Link href={`/adoption/${_id}`}>
      <Card
        className="w-[335px] relative shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        // onClick={handleCardClick}
      >
        {/* <Button
        variant="ghost"
        className="p-0 absolute right-3 top-2 text-2xl hover:scale-150 hover:bg-transparent z-10"
        onClick={wishList}
      >
        {loved ? <VscHeartFilled /> : <VscHeart />}
      </Button> */}
        <CardHeader className="mb-4 p-0 h-48">
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={pet.imageUrl[0]}
              alt={`Photo of ${pet.name}`}
              className="rounded-[10px] object-cover"
            />
          </div>
        </CardHeader>
        <CardContent className="h-40 overflow-hidden mb-3">
          <h1 className="text-2xl mb-2 font-semibold text-[#FD7E14]">
            {pet?.name}
          </h1>
          <div className="text-justify">{description}</div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center gap-1 text-base">
            <GrLocationPin />
            <span>{location}</span>
          </div>
          <Button className="bg-[#FD7E14]">See more</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
