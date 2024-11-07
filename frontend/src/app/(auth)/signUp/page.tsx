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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignUp = () => {
  const { isLoading, setIsLoading } = useContext(ProfileContext);
  const router = useRouter();

  const [userForm, setUserForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role: "user",
    password: "",
    rePassword: "",
  });

  const handleSignUp = async () => {
    const { firstname, lastname, email, password, rePassword, role } = userForm;

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (password !== rePassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${apiUrl}/api/v1/auth/signup`, {
        firstname,
        lastname,
        email,
        password,
        role,
      });
      if (res.status === 201) {
        toast.success("User signed up successfully");
        setIsLoading(false);
        router.push("/signin");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      setIsLoading(false);
      toast.error("Failed to sign up. Please try again.");
    }
  };

  const isPasswordValid = userForm.password.length >= 8;

  if (isLoading) return <Loading />;
  console.log("USerform", userForm);

  return (
    <div className="flex min-h-[calc(100vh-290px)] justify-center items-center bg-[#F8F9FA] dark:bg-[#121212] px-4 py-8">
      <div className="w-full max-w-[420px] md:w-[420px] lg:w-[380px]">
        <h1 className="font-semibold text-xl md:text-2xl text-center mb-6 md:mb-8">
          Register
        </h1>

        <div className="space-y-4">
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
              placeholder="Lastname"
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
              placeholder="Firstname"
              value={userForm.firstname}
              onChange={(e) => {
                setUserForm({ ...userForm, firstname: e.target.value });
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
              value={userForm.rePassword}
              onChange={(e) => {
                setUserForm({ ...userForm, rePassword: e.target.value });
              }}
            />
          </div>

          <Select
            defaultValue="user"
            onValueChange={(value) => setUserForm({ ...userForm, role: value })}
          >
            <SelectTrigger className="rounded-full">
              <SelectValue placeholder="Sign up as an user" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="user">User</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <ul className="flex flex-col text-xs list-disc px-6 my-4 gap-1">
          <li className={isPasswordValid ? "text-green-500" : "text-red-500"}>
            Password must be at least 8 characters long
          </li>
        </ul>

        <div className="flex flex-col gap-4 md:gap-6 mt-6">
          <Button
            className="bg-[#FD7E14] hover:bg-[#fd7e14]/90 w-full rounded-full py-2 h-auto"
            onClick={handleSignUp}
          >
            Create
          </Button>
          <Button
            variant={"outline"}
            className="border-[#FD7E14] hover:bg-[#fd7e14]/10 w-full rounded-full py-2 h-auto"
          >
            <Link href="/signin" className="w-full">
              Log In
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
