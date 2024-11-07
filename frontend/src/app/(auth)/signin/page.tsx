"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "@/components/context/user_context";

const SignIn = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const [userF, setUserF] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email: userF.email,
        password: userF.password,
        login_type: "user",
      });
      if (res.status === 201) {
        toast.success("User signed in successfully");
        const { token } = res.data;
        setUser(res.data.user);
        localStorage.setItem("token", token);
        router.push("/");
      }
      // console.log("res", res);
    } catch (error) {
      console.error("There was an error signing in:", error);
      toast.error("User not found");
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-290px)] justify-center items-center bg-[#F8F9FA] dark:bg-[#121212] px-4 py-8">
      <div className="w-full max-w-[420px] md:w-[420px] lg:w-[380px]">
        <h1 className="font-semibold text-xl md:text-2xl text-center mb-6 md:mb-8">
          Нэвтрэх
        </h1>

        <div className="space-y-4">
          <Label className="h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="black"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <Input
              type="text"
              className="grow border-none h-9 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Email"
              value={userF?.email}
              onChange={(e) => {
                if (userF) setUserF({ ...userF, email: e.target.value });
              }}
            />
          </Label>

          <Label className="h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="black"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <Input
              type="password"
              placeholder="********"
              className="grow border-none bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={userF?.password}
              onChange={(e) => {
                if (userF) setUserF({ ...userF, password: e.target.value });
              }}
            />
          </Label>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <Button
            className="bg-[#FD7E14] hover:bg-[#fd7e14]/90 w-full rounded-full py-2 h-auto"
            onClick={handleSignIn}
          >
            Нэвтрэх
          </Button>

          <Link
            href="/recoverpass"
            className="text-center underline text-sm text-[#71717A]"
          >
            Нууц үг мартсан
          </Link>

          <Button
            variant={"outline"}
            className="border-[#FD7E14] hover:bg-[#fd7e14]/10 w-full rounded-full py-2 h-auto mt-2"
          >
            <Link href="/signUp" className="w-full">
              Бүртгүүлэх
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
