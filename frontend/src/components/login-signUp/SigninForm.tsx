"use client";
import { useContext, useState, useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";

import { Fredoka } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { UserContext } from "../context/user_context";
import { useRouter } from "next/navigation";

const fredoka = Fredoka({ subsets: ["latin"] });

const SigninForm = () => {
  const { setUser } = useContext(UserContext);
  const router = useRouter();
  const [userForm, setUserForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    role: "user",
    password: "",
    rePassword: "",
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
        e.preventDefault();
        setUserForm((prev) => ({
          ...prev,
          email: "john@gmail.com",
          password: "password123",
        }));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSignIn = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/auth/login`, {
        email: userForm.email,
        password: userForm.password,
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
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center ">
        <div className="p-8 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8 ">
              <h1
                className={`${fredoka.className} text-center text-5xl font-bold text-orange-500 mb-7`}>
                Welcome back!
              </h1>
              <div className="flex justify-evenly items-center w-full mb-7 p-5">
                <FaFacebook className="icon w-[15%]" />
                <FaGoogle className="icon w-[15%]" />
              </div>

              <p className={`${fredoka.className} text-center text-gray-500`}>
                or use your email and password:
              </p>

              <div className="mt-12">
                <div className="relative">
                  <input
                    id="signin-email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2  border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="john@doe.com"
                    value={userForm.email}
                    onChange={(e) => {
                      setUserForm({ ...userForm, email: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="email"
                    className={`${fredoka.className} absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>
                    Email
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="signin-password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-indigo-600"
                    placeholder="Password"
                    value={userForm.password}
                    onChange={(e) => {
                      setUserForm({ ...userForm, password: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`${fredoka.className} absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>
                    Password
                  </label>
                </div>

                <input
                  type="submit"
                  value="Sign in"
                  onClick={handleSignIn}
                  className="mt-20 px-8 py-4 uppercase rounded-full bg-orange-500 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer"
                />
              </div>
              <Link
                href="/recoverpass"
                className={`${fredoka.className} mt-4 block text-sm text-center font-medium text-orange-500 hover:underline focus:outline-none focus:ring-2 focus:ring-indigo-500`}>
                {" "}
                Forgot your password?{" "}
              </Link>
              <p className="text-xs text-gray-500 text-center mt-4">
                Press Ctrl/Cmd + Shift + F to auto-fill
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SigninForm;
