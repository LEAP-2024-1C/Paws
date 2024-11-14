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
import { motion } from "framer-motion";

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

  const NavLink = ({
    href,
    children,
    className = "",
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <motion.div whileHover={{ scale: 1.05 }} className="relative">
        <Link href={href} className={`relative group ${className}`}>
          {children}
          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#FD7E14] transition-all duration-300 group-hover:w-full" />
        </Link>
      </motion.div>
    );
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
          <motion.ul
            className="flex gap-4 lg:gap-9"
            initial="initial"
            animate="animate"
            variants={{
              initial: {},
              animate: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}>
            <motion.li
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              }}>
              <NavLink href="/">Home</NavLink>
            </motion.li>

            <motion.li
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              }}>
              <NavLink href="/adoption">Adoption</NavLink>
            </motion.li>

            <motion.li
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              }}>
              <NavLink href="/donation">Donation</NavLink>
            </motion.li>

            <motion.li
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              }}>
              <Link
                href="/sos"
                className="animate-blink text-red-600 font-semibold hover:scale-105 transition-transform">
                Emergency
              </Link>
            </motion.li>

            <motion.li
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              }}>
              <NavLink href="/shop">Shop</NavLink>
            </motion.li>

            <motion.li
              variants={{
                initial: { y: -20, opacity: 0 },
                animate: { y: 0, opacity: 1 },
              }}>
              <NavLink href="/articles">Blog</NavLink>
            </motion.li>
          </motion.ul>
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
            <Link
              href="/adoption"
              className="p-2 hover:bg-red-600 hover:text-[#FD7E14] rounded">
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
