import { Product } from "@/lib/data";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

const ShoppingCards = ({ image, name, price, id }: Product) => (
  <div key={id} className=" border rounded-xl">
    <Image src={image} alt="product image" width={290} height={306}></Image>
    <div className="flex justify-between mt-5 px-5">
      <h4 className="font-bold text-md">{name}</h4>
      <Heart color="orange" />
    </div>
    <p className="pl-5 pb-5 text-sm">{price.toLocaleString()}₮</p>
  </div>
);

export default ShoppingCards;
