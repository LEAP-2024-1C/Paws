"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const Header = () => {
  return (
    <header className="flex justify-center mt-8 ">
      <div className="w-4/5 px-4 py-3 flex justify-between items-center rounded-3xl bg-white border-2">
        <span className="flex">
          <Link href="/" className="flex">
            <img src="/images/logo.png" alt="logo" className="w-6 h-6" />
            <h1 className="font-bold">Pawchig</h1>
          </Link>
        </span>
        <span>
          <ul className="flex gap-9">
            <Link href="/">
              <p>Нүүр хуудас </p>
            </Link>
            <Link href="/adoption">
              <p>Үрчлэл</p>{" "}
            </Link>
            <Link href="/donation">
              <p>Хандив</p>{" "}
            </Link>
            <Link href="/sos">
              <p>Яаралтай тусламж </p>
            </Link>
            <Link href="/blog">
              <p>Блог </p>
            </Link>
          </ul>
        </span>
        <span>
          <Button className="bg-amber-500 rounded-lg">Нэвтрэх</Button>
        </span>
      </div>
    </header>
  );
};
export default Header;
