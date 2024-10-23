"use client";
import { apiUrl } from "@/utils/util";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Loading from "@/components/recover_pass/loading";

const EnterNewPass = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resetToken = searchParams.get("resettoken");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    rePassword: "",
  });

  const createNewPass = async () => {
    const { password, rePassword } = userData;
    if (password !== rePassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/v1/auth/verify-password`,
        {
          password: password,
          resetToken,
        }
      );
      if (response.status === 200) {
        toast.success("Changed password successfully");
        router.push("/signin");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("verify-pass error", error);
      toast.error("Couldn't change the password");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-[calc(100vh-290px)] justify-center bg-gray-100 dark:bg-[#121212]">
      <div className="w-1/5 mt-24">
        <h1 className="font-semibold text-2xl text-center mb-8">
          Нууц үг сэргээх
        </h1>
        <Input
          type="password"
          className="rounded-full flex items-center px-4 py-1 grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Шинэ нууц үг"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <Input
          type="password"
          className="rounded-full flex items-center px-4 py-1 grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0 my-4"
          placeholder="Шинэ нууц үг дахин оруулах"
          value={userData.rePassword}
          onChange={(e) => {
            setUserData({ ...userData, rePassword: e.target.value });
          }}
        />
        <ul className=" flex flex-col text-xs list-disc px-4 mb-4 gap-1">
          <li className="">Том үсэг орсон байх</li>
          <li>Жижиг үсэг орсон байх</li>
          <li>Тоо орсон байх</li>
          <li>Тэмдэгт орсон байх</li>
        </ul>
        <div className="flex flex-col gap-12">
          <Button
            className="bg-[#FD7E14]"
            size="custom"
            onClick={createNewPass}>
            Үүсгэх
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterNewPass;
