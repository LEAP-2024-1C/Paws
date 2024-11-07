"use client";
import React from "react";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div
        style={{ backgroundImage: "url('/images/footer.png')" }}
        className="w-full min-h-[240px] m-auto"
      >
        <div className="flex flex-col md:flex-row justify-around items-start gap-8 p-6 md:p-20">
          <div className="w-full md:w-auto text-center md:text-left">
            <Link
              href="/"
              className="flex gap-4 items-center justify-center md:justify-start"
            >
              <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
              <p className="font-bold text-lg">Pawchig</p>
            </Link>
          </div>
          <ul className="flex flex-wrap justify-center md:flex-row gap-6 md:gap-10 text-sm md:text-base w-full md:w-auto">
            <div className="w-[120px] text-center md:text-left">
              <Link href="/" className="font-bold">
                Home
              </Link>
            </div>
            <div className="w-[120px] text-center md:text-left">
              <Link href="/adoption" className="font-bold">
                Adoption
              </Link>
              <p>Cat</p>
              <p>Dog</p>
              <p>Other pets</p>
            </div>
            <div className="w-[120px] text-center md:text-left">
              <Link href="/donation" className="font-bold">
                Donation
              </Link>
            </div>
            <div className="w-[120px] text-center md:text-left">
              <Link href="/sos" className="font-bold">
                Emergency
              </Link>
            </div>
            <div className="w-[120px] text-center md:text-left">
              <Link href="/shop" className="font-bold">
                Shop
              </Link>
              <p>Cat</p>
              <p>Dog</p>
              <p>Other pets</p>
            </div>
            <div className="w-[120px] text-center md:text-left">
              <Link href="/articles" className="font-bold">
                Blog
              </Link>
              <p>Pet care</p>
              <p>Pet health</p>
              <p>Dog care</p>
              <p>Pet advice</p>
              <p>Pet facts</p>
            </div>
          </ul>
          <div className="text-center md:text-left w-full md:w-auto">
            <span className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <IoIosCall />
              <p>(976) 7007-1234</p>
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <IoIosMail />
              <p>contact@pawchig.mn</p>
            </span>
            <ul className="flex gap-6 justify-center md:justify-start">
              <FaFacebook className="cursor-pointer hover:opacity-80" />
              <FaInstagram className="cursor-pointer hover:opacity-80" />
              <FaTwitter className="cursor-pointer hover:opacity-80" />
              <FaLinkedin className="cursor-pointer hover:opacity-80" />
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
