import { IAdoptionReq } from "@/interface";
import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa6";

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
    <div
      className="border rounded-xl max-w-[400px] max-h-[320px] overflow-auto"
      key={_id}
    >
      <Image
        src={imgUrl[0]}
        alt="card image"
        width={306}
        height={280}
        className="rounded-t-xl"
      ></Image>
      <div className="flex justify-between bg-slate-100 h-16 px-5 pt-3">
        <h2 className="font-bold text-xl">{pet.name}</h2>
        <p className="w-8 h-8 rounded-full bg-slate-200 flex justify-center items-center text-amber-600">
          <FaArrowRight />
        </p>
      </div>
    </div>
  );
};

export default PetsCard;
