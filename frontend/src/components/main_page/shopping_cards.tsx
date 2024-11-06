import { Product } from "@/lib/data";
import { Heart } from "lucide-react";
import Image from "next/image";
import React from "react";

const ShoppingCards = ({ image, name, price, id }: Product) => (
  <div key={id} className="border rounded-xl shadow-lg">
    <Image
      src={image}
      alt="Example"
      width={1200}
      height={800}
      quality={100}
      priority
    />
    <div className="flex justify-between mt-5 px-5">
      <h4 className="font-bold text-md">{name}</h4>
      <Heart color="orange" />
    </div>
    <p className="pl-5 pb-5 text-sm">{price.toLocaleString()}₮</p>
  </div>
);

export default ShoppingCards;
