"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut, Menu, User, X } from "lucide-react";
import { UserContext } from "../context/user_context";
import Modal from "../sos/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [isModalShowing, setIsModalShowing] = useState(false);
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="flex justify-center bg-[#F8F9FA]">
      <div className="w-full md:w-4/5 lg:w-3/5 px-4 md:px-10 py-3 shadow-lg flex justify-between items-center rounded-full bg-white mt-14">
        <span className="flex">
          <Link href="/" className="flex gap-2 items-center">
            <img src="/images/logo.png" alt="logo" className="w-8 md:w-auto" />
            <h1 className="font-bold text-lg md:text-xl">Pawchig</h1>
          </Link>
        </span>
        <span className="hidden md:block">
          <ul className="flex gap-4 lg:gap-9">
            <Link href="/">Home</Link>
            <Link href="/adoption">Adoption</Link>
            <Link href="/donation">Donation</Link>
            <Link
              href="/sos"
              className="animate-blink text-red-600 font-semibold">
              Emergency
            </Link>

            <Link href="/shop">Shop</Link>
            <Link href="/articles">Blog</Link>
          </ul>
        </span>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <span className="hidden md:block">
          {user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{user.firstname}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/user_section">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/requests">Your Requests</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Button onClick={logOut} variant="ghost">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button size="custom" className="bg-[#FD7E14]">
              <Link href="/login">Login</Link>
            </Button>
          )}
        </span>
      </div>
      {isMenuOpen && (
        <div className="fixed top-[100px] left-0 right-0 bg-white p-4 shadow-lg z-30 md:z-0 md:hidden">
          <ul className="flex flex-col gap-4">
            <Link href="/" className="p-2 hover:bg-gray-100 rounded">
              Home
            </Link>
            <Link href="/adoption" className="p-2 hover:bg-gray-100 rounded">
              Adoption
            </Link>
            <Link href="/donation" className="p-2 hover:bg-gray-100 rounded">
              Donation
            </Link>
            <Link
              href="/sos"
              className="p-2 hover:bg-gray-100 rounded animate-blink text-red-600 font-semibold">
              Emergency
            </Link>
            <Link href="/shop" className="p-2 hover:bg-gray-100 rounded">
              Shop
            </Link>
            <Link href="/articles" className="p-2 hover:bg-gray-100 rounded">
              Blog
            </Link>
            {user ? (
              <>
                <Link
                  href="/user_section"
                  className="p-2 hover:bg-gray-100 rounded">
                  Profile
                </Link>
                <Button
                  onClick={logOut}
                  variant="ghost"
                  className="w-full justify-start p-2">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </>
            ) : (
              <Link href="/login" className="p-2 hover:bg-gray-100 rounded">
                Login
              </Link>
            )}
          </ul>
        </div>
      )}
      <Modal
        isShowing={isModalShowing}
        onClose={() => setIsModalShowing(false)}
      />
    </header>
  );
};
export default Header;
