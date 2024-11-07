import React, { useContext, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { UserContext } from "../context/user_context";
import { ProfileContext } from "../context/profile_context";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/utils/util";

const logoImg = require("../../assets/images/NavBar/logo.png");

const PhoneRegister = () => {
  const {}: any = useContext(UserContext);
  const [userForm, setUserForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role: "user",
    password: "",
    rePassword: "",
  });

  const handleSignUp = async () => {
    const { isLoading, setIsLoading } = useContext(ProfileContext);
    const router = useRouter();
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

  return (
    <div>
      <section className=" dark:bg-gray-900 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
            <div className=" p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Don`&#39`t have an account ?
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-12">
                    Username
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userForm.email}
                    onChange={(e) => {
                      setUserForm({ ...userForm, email: e.target.value });
                    }}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500"
                    placeholder="username"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-5">
                    Email
                  </label>
                  <input
                    type="name"
                    value={userForm.lastname}
                    onChange={(e) => {
                      setUserForm({ ...userForm, lastname: e.target.value });
                    }}
                    name="name"
                    id="name"
                    placeholder="name@company.com"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) => {
                      setUserForm({ ...userForm, password: e.target.value });
                    }}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-5">
                    Re-Password
                  </label>
                  <input
                    type="password"
                    value={userForm.rePassword}
                    onChange={(e) => {
                      setUserForm({ ...userForm, rePassword: e.target.value });
                    }}
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700
                       dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="ml-3 text-sm">
                      <Link href="/auth">
                        <button className="  first-letter:text-sm font-medium text-orange-500 hover:underline dark:text-primary-500">
                          Sign in
                        </button>
                      </Link>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={handleSignUp}
                  type="submit"
                  className=" w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign up
                </button>
                <p className="mt-12 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/auth"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default PhoneRegister;
