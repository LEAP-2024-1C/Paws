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
    <Card key={_id} className="border rounded-xl shadow-lg">
      <Image
        src={images[0]}
        alt="Example"
        width={1200}
        height={800}
        quality={100}
        priority
      />
      <div className="bg-slate-50 pt-2 rounded-b-xl">
        <div className="flex justify-between mt-5 px-5">
          <div>
            <h4 className="font-bold text-lg">{name}</h4>
          </div>
          <Heart color="orange" />
        </div>
        <p className="pl-5 pb-5 text-sm">{price.toLocaleString()}₮</p>
      </div>
    </Card>
  </Link>
);

export default ShoppingCards;
