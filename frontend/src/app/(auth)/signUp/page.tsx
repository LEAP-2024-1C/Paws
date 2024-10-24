"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import axios from "axios";
import { ProfileContext } from "@/components/context/profile_context";
import Loading from "@/components/recover_pass/loading";

const SignUp = () => {
  const { isLoading, setIsLoading } = useContext(ProfileContext);
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    rePassword: "",
  });

  const handleSignUp = async () => {
    const { firstname, lastname, email, password, rePassword } = userForm;
    if (password !== rePassword) {
      toast.error("Password doesn't match");
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.post(`${apiUrl}/api/v1/auth/signup`, {
        firstname,
        lastname,
        email,
        password,
      });
      if (res.status === 201) {
        // console.log("res", res);
        toast.success("User signed up successfully");
        setIsLoading(false);
        router.push("/signin");
      }
    } catch (error) {
      // res.status(400).json({ message: "Failed to sign up. Please try again." });
      console.error("There was an error signing up:", error);
      setIsLoading(false);
      toast.error("Failed to sign up. Please try again.");
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="flex h-[calc(100vh-290px)] justify-center items-center bg-gray-100 dark:bg-[#121212]">
      <div className="w-1/5">
        <h1 className="font-semibold text-2xl text-center mb-8">Бүртгүүлэх</h1>
        <div className="h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1 my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <Input
            type="text"
            className="grow border-none bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Овог"
            value={userForm.lastname}
            onChange={(e) => {
              setUserForm({ ...userForm, lastname: e.target.value });
            }}
          />
        </div>
        <div className="h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <Input
            type="text"
            className="grow border-none bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Нэр"
            value={userForm.firstname}
            onChange={(e) => {
              setUserForm({ ...userForm, firstname: e.target.value });
            }}
          />
        </div>
        <div className="h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1 my-4">
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
            className="grow border-none bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Email"
            value={userForm.email}
            onChange={(e) => {
              setUserForm({ ...userForm, email: e.target.value });
            }}
          />
        </div>
        <div className="h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70 "
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <Input
            type="password"
            className="grow border-none bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={userForm.password}
            onChange={(e) => {
              setUserForm({ ...userForm, password: e.target.value });
            }}
          />
        </div>
        <div className=" h-9 rounded-full flex items-center gap-2 bg-white px-3 py-1 my-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="black"
            className="h-4 w-4 opacity-70 "
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <Input
            type="password"
            className="grow border-none bg-transparent h-9 focus-visible:ring-0 focus-visible:ring-offset-0"
            value={userForm.rePassword}
            onChange={(e) => {
              setUserForm({ ...userForm, rePassword: e.target.value });
            }}
          />
        </div>
        <ul className=" flex flex-col text-xs list-disc px-4 mb-4 gap-1">
          <li className="">Том үсэг орсон байх</li>
          <li>Жижиг үсэг орсон байх</li>
          <li>Тоо орсон байх</li>
          <li>Тэмдэгт орсон байх</li>
        </ul>
        <div className="flex flex-col gap-12">
          <Button className="bg-[#FD7E14]" size="custom" onClick={handleSignUp}>
            Үүсгэх
          </Button>
          <Button
            variant={"outline"}
            className="border-[#FD7E14]"
            size="custom"
          >
            <Link href="/signin">Нэвтрэх</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
