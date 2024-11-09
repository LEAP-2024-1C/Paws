"use client";
import { useContext, useEffect, useState } from "react";
import { Fredoka } from "next/font/google";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { ProfileContext } from "../context/profile_context";
import { apiUrl } from "@/utils/util";
import Loading from "../recover_pass/loading";

const fredoka = Fredoka({ subsets: ["latin"] });

const SignupForm = () => {
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

  // Add keyboard shortcut (Ctrl/Cmd + Shift + F) to auto-fill
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "F") {
        e.preventDefault();
        setUserForm({
          email: "john@gmail.com",
          firstname: "John",
          lastname: "Doe",
          role: "user",
          password: "password123",
          rePassword: "password123",
        });
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

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
        router.push("/login");
      }
    } catch (error) {
      console.error("There was an error signing up:", error);
      setIsLoading(false);
      toast.error("Failed to sign up. Please try again.");
    }
  };

  const isPasswordValid = userForm.password.length >= 8;

  if (isLoading) return <Loading />;

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <div className="flex justify-center items-center">
        <div className="px-8 py-4 flex-1">
          <div className="mx-auto overflow-hidden">
            <div className="p-8">
              <h1
                className={`text-center text-5xl font-bold text-orange-500 mb-10 ${fredoka.className}`}>
                Create account
              </h1>

              <div className="mt-12">
                <div className="relative">
                  <input
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600"
                    placeholder="Name"
                    value={userForm.lastname}
                    onChange={(e) => {
                      setUserForm({ ...userForm, lastname: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="name"
                    className={`${fredoka.className} absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>
                    Lastname
                  </label>
                </div>
                <div className="relative mt-8">
                  <input
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600"
                    placeholder="Name"
                    value={userForm.firstname}
                    onChange={(e) => {
                      setUserForm({ ...userForm, firstname: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="name"
                    className={`${fredoka.className} absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>
                    Firstame
                  </label>
                </div>
                <div className="mt-8 relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600"
                    placeholder="john@doe.com"
                    value={userForm.email}
                    onChange={(e) => {
                      setUserForm({ ...userForm, email: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="email"
                    className={`${fredoka.className} absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>
                    Email address
                  </label>
                </div>
                <div className="mt-8 relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600"
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
                <div className="mt-8 relative">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-orange-600"
                    placeholder="Re-enter password"
                    value={userForm.rePassword}
                    onChange={(e) => {
                      setUserForm({ ...userForm, rePassword: e.target.value });
                    }}
                  />
                  <label
                    htmlFor="password"
                    className={`${fredoka.className} absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm`}>
                    Re-enter password
                  </label>
                </div>
                <div className="flex flex-col text-xs my-4 gap-1">
                  <div
                    className={
                      isPasswordValid ? "text-green-500" : "text-red-500"
                    }>
                    Password must be at least 8 characters long
                  </div>
                </div>

                <button
                  onClick={handleSignUp}
                  className={` ${fredoka.className} mt-12 px-8 py-4 uppercase rounded-full bg-orange-500 hover:bg-indigo-500 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 focus:ring-opacity-80 cursor-pointer`}>
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add tooltip to show keyboard shortcut */}
      <div className="text-xs text-gray-500 text-center">
        Press Ctrl/Cmd + Shift + F to auto-fill the form
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupForm;
