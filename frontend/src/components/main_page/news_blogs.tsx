import { NewsCard } from "@/lib/data";
import Image from "next/image";
import React from "react";

const NewsAndBlogs = ({ image, title, date, id }: NewsCard) => {
  return (
    <main className="relative rounded-xl" key={id}>
      <div className="absolute z-20 top-4 right-4 border rounded-full w-20 bg-black text-white text-center">
        News
      </div>
      <Image
        src={image}
        alt="card image"
        width={400}
        height={480}
        className="border rounded-xl brightness-[.70]"
      ></Image>
      <div className="my-8 flex flex-col gap-3 ml-4">
        <p className="text-md text-gray-500 font-thin">{date}</p>
        <h3 className="flex flex-wrap w-[300px] font-bold text-xl">{title}</h3>
      </div>
    </main>
  );
};

export default NewsAndBlogs;
