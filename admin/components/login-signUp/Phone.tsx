import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { UserContext } from "../context/user_context";

import axios from "axios";
import { apiUrl } from "@/utils/util";
import { useRouter } from "next/navigation";

// const logoImg = require("../../assets/images/NavBar/logo.png");

const Phone = () => {
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
    <div>
      <section className=" dark:bg-gray-900 lg:hidden md:hidden max-md:hidden sm:block max-sm:block ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-xl font-medium text-gray-900 dark:text-white mt-12">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userF?.email}
                    onChange={(e) => {
                      if (userF) setUserF({ ...userF, email: e.target.value });
                    }}
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500"
                    placeholder="name@company.com"
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
                    value={userF?.password}
                    onChange={(e) => {
                      if (userF)
                        setUserF({ ...userF, password: e.target.value });
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
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 
                            focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Forgot password?
                  </a>
                </div>
                <button
                  onClick={handleSignIn}
                  type="submit"
                  className=" w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 
                  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign in
                </button>
                <p className="mt-12 text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <Link
                    href="/phoneregister"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Sign up
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

export default Phone;
