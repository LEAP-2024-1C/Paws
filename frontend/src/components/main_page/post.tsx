import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Post = () => {
  return (
    <main
      className="flex flex-col lg:flex-row justify-center lg:gap-20 xl:gap-40 items-center 
      mt-10 sm:mt-20 lg:mt-40 h-min bg-slate-100 
      py-10 sm:py-20 lg:py-40 px-4 sm:px-8"
    >
      <div className="w-full sm:w-[600px] lg:w-[600px] overflow-hidden">
        <Image
          src="https://i.pinimg.com/originals/34/6c/80/346c8066de4ab8d585553f0eb94ca20e.jpg"
          alt="posts photo"
          width={500}
          height={400}
          className="border rounded-xl brightness-[.70] w-full 
            max-w-[280px] sm:max-w-[350px] lg:max-w-[500px] 
            h-auto mb-6 sm:mb-10 lg:mb-0 mx-auto lg:mx-0"
        />
      </div>
      <div
        className="flex flex-col gap-4 sm:gap-6 lg:gap-10 text-center lg:text-left 
        max-w-[90%] sm:max-w-[600px] lg:max-w-none"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl text-amber-500 font-bold">
          The smarter way to shop <br className="hidden lg:block" />
          for your pet
        </h2>
        <p className="text-xs sm:text-sm text-gray-700 px-2 sm:px-4 lg:px-0">
          Lorem ipsum dolor sit amet consectetur. At et vehicula{" "}
          <br className="hidden lg:block" />
          sodales est proin turpis pellentesque sinulla a aliquam{" "}
          <br className="hidden lg:block" /> amet rhoncus quisque eget sit
        </p>
        <Button className="text-white w-32 sm:w-40 mx-auto lg:mx-0">
          Тусламж үзүүлэх
        </Button>
      </div>
    </main>
  );
};

export default Post;
