"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { LogOut, Menu, User, X } from "lucide-react";
import { UserContext } from "../context/user_context";
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
  const logOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/signin");
  };

  return (
    <header className="flex justify-center bg-[#F8F9FA]">
      <div className="w-full md:w-4/5 lg:w-3/5 px-10 py-3 shadow-lg flex justify-between items-center rounded-full bg-white mt-14">
        <span className="flex">
          <Link href="/" className="flex gap-2 items-center">
            <img src="/images/logo.png" alt="logo" className="" />
            <h1 className="font-bold text-xl">Pawchig</h1>
          </Link>
        </span>
        <span>
          <ul className="flex gap-9">
            <Link href="/">Home</Link>
            <Link href="/adoption">Adoption</Link>
            <Link href="/donation">Donation</Link>
            <Link href="/sos">Emergency</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/articles">Blog</Link>
          </ul>
        </span>
        <span>
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
              <Link href="/signin">Нэвтрэх</Link>
            </Button>
          )}
        </span>
      </div>
    </header>
  );
};
export default Header;
