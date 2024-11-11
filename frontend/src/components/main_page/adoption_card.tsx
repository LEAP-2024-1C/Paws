import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export type Card = {
  _id: string;
  imgUrl: string[];
  pet: {
    name: string;
    imageUrl: string[];
  };
};

const PetsCard = ({ _id, pet, imgUrl }: Card) => {
  return (
    <Link href={`../adoption/${_id}`}>
      <Card
        className="border w-[340x] rounded-xl h-full bg-slate-100 hover:brightness-[.70] hover:scale-105 shadow-xl"
        key={_id}>
        <CardContent
          className="w-full h-[280px] bg-cover bg-center  overflow-auto rounded-t-xl"
          style={{ backgroundImage: `url(${imgUrl[0]})` }}></CardContent>
        <CardFooter className="flex justify-between bg-slate-100 h-16 px-5 pt-3">
          <h2 className="font-bold text-xl">{pet?.name}</h2>
          <p className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center text-amber-600">
            <FaArrowRight />
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default PetsCard;
