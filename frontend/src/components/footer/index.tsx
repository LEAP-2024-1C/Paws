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
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div
        style={{ backgroundImage: "url('/images/footer.png')" }}
        className="w-full min-h-[240px] m-auto"
      >
        <div className="flex flex-col md:flex-row justify-around items-start gap-8 p-6 md:p-8">
          <div className="w-full md:w-auto text-center md:text-left flex flex-col gap-6">
            <Link
              href="/"
              className="flex gap-4 items-center justify-center md:justify-start"
            >
              <img src="/images/logo.png" alt="logo" className="w-8 h-8" />
              <p className="font-bold text-lg">Pawchig</p>
            </Link>

            <p className="text-xs hidden lg:block">
              We make the world a better place <br />
              for pets by investing in community <br />
              partners that advocate & care for the <br />
              well-being ofpets and all who love them.
            </p>
          </div>
          <ul className="flex flex-wrap justify-center md:flex-row gap-6 md:gap-10 text-sm md:text-base w-full md:w-auto md:my-auto">
            <Link
              href="/"
              className="font-3xl transform hover:scale-125 hover:text-[#f3d6b4] transition-transform"
            >
              Home
            </Link>
            <Link
              href="/adoption"
              className="font-3xl transform hover:scale-125 hover:text-[#f3d6b4] transition-transform"
            >
              Adoption
            </Link>
            <Link
              href="/donation"
              className="font-3xl transform hover:scale-125 hover:text-[#f3d6b4] transition-transform"
            >
              Donation
            </Link>
            <Link
              href="/sos"
              className="font-3xl transform hover:scale-125 hover:text-[#f3d6b4] transition-transform"
            >
              Emergency
            </Link>
            <Link
              href="/shop"
              className="font-3xl transform hover:scale-125 hover:text-[#f3d6b4] transition-transform"
            >
              Shop
            </Link>
            <Link
              href="/articles"
              className="font-3xl transform hover:scale-125 hover:text-[#f3d6b4] transition-transform"
            >
              Blog
            </Link>
          </ul>
          <div className="text-center md:text-left w-full md:w-auto flex flex-col gap-3">
            <p className="font-bold">Contact</p>
            <span className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <IoIosCall />
              <p>(976) 7007-1234</p>
            </span>
            <span className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <IoIosMail />
              <p>contact@pawchig.mn</p>
            </span>
          </div>
        </div>
        <div className="flex justify-between border-t-2 pt-8 pb-5 px-5 md:mx-56">
          <p className="font-sm">© 2024 Pawchig</p>
          <ul className="flex gap-6 justify-center md:justify-start">
            <FaFacebook className=" transform hover:scale-125 hover:text-[#144afd] transition-transform size-5" />
            <FaInstagram className=" transform hover:scale-125 hover:text-[#e94fb1] transition-transform size-5" />
            <FaXTwitter className=" transform hover:scale-125  transition-transform size-5" />
            <FaLinkedin className=" transform hover:scale-125 hover:text-[#14cafd] transition-transform size-5" />
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
