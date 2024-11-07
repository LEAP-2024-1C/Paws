"use client";

import { Calendar, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { CardType } from "@/lib/types";
import Image from "next/image";

export const BlogsCards = ({ image, title, date, id }: CardType) => {
  return (
    <Link href={"/articles/" + id}>
      <Card className="w-[340px] shadow-xl hover:brightness-[.70]" key={id}>
        <CardHeader className="mb-4 relative p-0 h-48">
          <div className="overflow-hidden rounded-t-lg">
            <Image
              src={image}
              alt="Example"
              width={1200}
              height={800}
              quality={90}
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="md:text-xl md:font-bold font-semibold text-sm min-h-14 max-h-60 text-wrap">
            {title}
          </h3>
        </CardContent>
        <CardFooter className="flex justify-between">
          <ul className="text-sm font-light flex flex-col gap-2">
            <li className="flex gap-2">
              {" "}
              <Pencil strokeWidth={1} size={20} />
              Amy Harris
            </li>
            <li className="flex gap-2">
              <Calendar strokeWidth={1} size={20} />
              {new Date(date).toLocaleDateString()}
            </li>
          </ul>
        </CardFooter>
      </Card>
    </Link>
  );
};
