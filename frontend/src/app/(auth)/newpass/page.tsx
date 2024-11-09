"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import Loading from "@/components/recover_pass/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

const NewPassPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EnterNewPass />
    </Suspense>
  );
};
// Create a separate component that uses useSearchParams
const EnterNewPass = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const resetToken = searchParams.get("resettoken");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    password: "",
    rePassword: "",
  });

  const isPasswordValid = userData.password.length >= 8;

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
        router.push("/login");
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
    <div className="flex h-[calc(100vh-290px)] justify-center bg-[#F8F9FA] dark:bg-[#121212]">
      <div className="w-1/5 mt-24">
        <h1 className="font-semibold text-2xl text-center mb-8">
          Recover Password
        </h1>
        <Input
          type="password"
          className="rounded-full flex items-center px-4 py-1 grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="New Password"
          value={userData.password}
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <Input
          type="password"
          className="rounded-full flex items-center px-4 py-1 grow border-none h-9 focus-visible:ring-0 focus-visible:ring-offset-0 my-4"
          placeholder="Enter your password again"
          value={userData.rePassword}
          onChange={(e) => {
            setUserData({ ...userData, rePassword: e.target.value });
          }}
        />
        <div className="flex flex-col text-xs list-disc my-4 gap-1">
          <div className={isPasswordValid ? "text-green-500" : "text-red-500"}>
            Password must be at least 8 characters long
          </div>
        </div>
        <div className="flex flex-col gap-12">
          <Button
            className="bg-[#FD7E14]"
            size="custom"
            onClick={createNewPass}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPassPage;
