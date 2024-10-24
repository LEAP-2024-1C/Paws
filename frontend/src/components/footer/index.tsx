"use client";
import React from "react";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="flex justify-around p-6 bg-slate-200 ">
      <div>
        <Link href="/" className="flex gap-4">
          <img src="/images/logo.png" alt="logo" />
          <p>Pawchig</p>
        </Link>
      </div>
      <ul className="flex  gap-6">
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
      <div>
        <span className="flex gap-6">
          <IoIosCall />
          <p>(976) 7007-1234</p>
        </span>
        <span className="flex gap-6">
          <IoIosMail />
          <p>contact@pawchig.mn</p>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
