"use client";
import React from "react";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row justify-around items-center gap-6 p-6 bg-slate-200">
      <div>
        <Link href="/" className="flex gap-4 items-center">
          <img src="/images/logo.png" alt="logo" className="w-12 h-12" />
          <p>Pawchig</p>
        </Link>
      </div>
      <ul className="flex flex-col md:flex-row text-center gap-4 md:gap-6">
        <Link href="/"> Нүүр хуудас</Link>
        <Link href="/adoption"> Үрчлэл</Link>
        <Link href="/donation"> Хандив</Link>
        <Link href="/sos">Яаралтай тусламж</Link>
        <Link href="/shop">Shop</Link>
      </ul>

      {/* <ul className='flex  gap-6'>
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
            </ul> */}
      <div className="text-center md:text-left">
        <span className="flex items-center justify-center md:justify-start gap-2">
          <IoIosCall />
          <p>(976) 7007-1234</p>
        </span>
        <span className="flex items-center justify-center md:justify-start gap-2">
          <IoIosMail />
          <p>contact@pawchig.mn</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
