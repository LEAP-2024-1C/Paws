"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/">Blog</Link>
          </ul>
        </span>
        <span>
          <Button size="custom" className="bg-[#FD7E14]">
            Нэвтрэх
          </Button>
        </span>
      </div>
    </header>
  );
};
export default Header;
