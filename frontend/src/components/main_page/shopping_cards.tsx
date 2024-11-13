import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface IData {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

const ShoppingCards = ({ images, name, price, _id }: IData) => (
  <Link href={`../shop/${_id}`}>
    <Card className="border rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
      <div className="relative overflow-hidden h-[350px]">
        <Image
          src={images[0]}
          alt={name}
          width={1200}
          height={800}
          quality={100}
          priority
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>
      <div className="bg-white pt-2 rounded-b-xl">
        <div className="flex justify-between mt-5 px-5">
          <div>
            <h4 className="font-bold text-lg group-hover:text-orange-500 transition-colors">
              {name}
            </h4>
          </div>
          <Heart
            className="transition-colors duration-300 group-hover:fill-orange-500"
            color="orange"
          />
        </div>
        <p className="pl-5 pb-5 text-sm font-medium text-orange-500">
          {price.toLocaleString()}₮
        </p>
      </div>
    </Card>
  </Link>
);

export default ShoppingCards;
