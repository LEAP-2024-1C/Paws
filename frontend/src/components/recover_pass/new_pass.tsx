import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const EnterNewPass = () => {
  return (
    // <div className="flex h-[calc(100vh-290px)] justify-center bg-gray-100 dark:bg-[#121212]">
    <div className="">
      {/* <div className="w-1/5 mt-24"> */}
      <h1 className="font-semibold text-2xl text-center mb-8">
        Нууц үг сэргээх
      </h1>
      <Input
        type="text"
        className="rounded-full flex items-center px-4 py-1 grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
        placeholder="Шинэ нууц үг"
      />
      <Input
        type="text"
        className="rounded-full flex items-center px-4 py-1 grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0 my-4"
        placeholder="Шинэ нууц үг дахин оруулах"
      />
      <ul className=" flex flex-col text-xs list-disc px-4 mb-4 gap-1">
        <li className="">Том үсэг орсон байх</li>
        <li>Жижиг үсэг орсон байх</li>
        <li>Тоо орсон байх</li>
        <li>Тэмдэгт орсон байх</li>
      </ul>
      <div className="flex flex-col gap-12">
        <Button className="bg-[#FD7E14]" size="custom">
          Үүсгэх
        </Button>
      </div>
    </div>
    // </div>
  );
};

export default EnterNewPass;
