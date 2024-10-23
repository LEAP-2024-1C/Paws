import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Post = () => {
  return (
    <main className="flex justify-center gap-60 items-center mt-40 h-min bg-slate-100 py-40">
      <Image
        src="https://i.pinimg.com/enabled/564x/51/ff/cf/51ffcf38dfef8a064409d75dee75adc3.jpg"
        alt="posts photo"
        width={500}
        height={600}
        className="border rounded-xl"
      ></Image>
      <div className="flex flex-col gap-10">
        <h2 className="text-4xl text-amber-500 font-bold">
          The smarter way to shop <br />
          for your pet
        </h2>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur. At et vehicula <br />
          sodales est proin turpis pellentesque sinulla a aliquam <br /> amet
          rhoncus quisque eget sit
        </p>
        <Button className="text-white w-40">Тусламж үзүүлэх</Button>
      </div>
    </main>
  );
};

export default Post;
