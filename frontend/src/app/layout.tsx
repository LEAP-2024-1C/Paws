"use client";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfileProvider } from "@/components/context/profile_context";
import { UserProvider } from "@/components/context/user_context";
import { ShoppingProvider } from "@/components/context/shopping_context";
import Header from "@/components/header";
import Footer from "@/components/footer";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <UserProvider>
            <ShoppingProvider>
              <ProfileProvider>
                <Header />
                {children}
                <Footer />
              </ProfileProvider>
            </ShoppingProvider>
          </UserProvider>
          <ToastContainer />
        </body>
      </html>
    </>
  );
}
