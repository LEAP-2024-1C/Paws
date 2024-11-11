"use client";
import React from "react";
import Link from "next/link";
import { IoIosCall } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white shadow-[inset_0_8px_6px_-6px_rgba(0,0,0,0.5)] z-10">
      <div
        style={{
          backgroundImage: "url('https://i.ibb.co/Y2pqdhK/footer.png')",
          backgroundRepeat: "no- repeat",
          // backgroundSize: "contain",
        }}
        className="w-full bg-center bg-cover">
        <div className="max-w-7xl mx-auto py-12">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 px-6 md:px-8">
            {/* Logo & Description */}
            <div className="w-full md:w-1/4 flex flex-col gap-6">
              <Link
                href="/"
                className="flex gap-4 items-center justify-center md:justify-start">
                <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
                <p className="font-bold text-xl">Pawchig</p>
              </Link>

              <p className="text-sm text-gray-600 hidden lg:block leading-relaxed">
                We make the world a better place for pets by investing in
                community partners that advocate & care for the well-being of
                pets and all who love them.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="w-full md:w-auto">
              <h4 className="font-bold text-lg mb-4 text-center md:text-left">
                Quick Links
              </h4>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-4 text-gray-600">
                {[
                  ["Home", "/"],
                  ["Adoption", "/adoption"],
                  ["Donation", "/donation"],
                  ["Emergency", "/sos"],
                  ["Shop", "/shop"],
                  ["Blog", "/articles"],
                ].map(([title, url]) => (
                  <li key={title}>
                    <Link
                      href={url}
                      className="hover:text-[#f3d6b4] transition-colors duration-200">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Information */}
            <div className="w-full md:w-auto">
              <h4 className="font-bold text-lg mb-4 text-center md:text-left">
                Contact
              </h4>
              <div className="flex flex-col gap-4 text-gray-600">
                <span className="flex items-center gap-3">
                  <IoIosCall className="text-xl" />
                  <p>(976) 7007-1234</p>
                </span>
                <span className="flex items-center gap-3">
                  <IoIosMail className="text-xl" />
                  <p>contact@pawchig.mn</p>
                </span>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-12 pt-6 px-6 md:px-8 border-t border-gray-200">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-600">
                © 2024 Pawchig. All rights reserved.
              </p>
              <div className="flex gap-6">
                {[
                  [FaFacebook, "#144afd"],
                  [FaInstagram, "#e94fb1"],
                  [FaXTwitter, "#000000"],
                  [FaLinkedin, "#14cafd"],
                ].map(([Icon], index) => (
                  <Link href="#" key={index}>
                    <Icon className="size-5 text-gray-600 hover:text-[#f3d6b4] transition-colors duration-200" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
