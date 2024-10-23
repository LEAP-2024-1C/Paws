import { NewsCard } from "@/lib/data";
import { Title } from "@radix-ui/react-toast";
import Image from "next/image";
import React from "react";

const NewsAndBlogs = ({ image, title, date }: NewsCard) => {
  return (
    <main className="rounded-xl">
      <article className="border rounded-full bg-black text-white text-center">
        News
      </article>
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
