"use client";
import LeftOverlayContent from "@/components/login-signUp/LeftOverlayContent";
import RightOverlayContent from "@/components/login-signUp/RightOverlayContent";
import SigninForm from "@/components/login-signUp/SigninForm";
import SignupForm from "@/components/login-signUp/SignupForm";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#F8F9FA] min-h-screen w-full">
      {/* Mobile View */}
      {isMobile ? (
        <div className="p-4 flex flex-col gap-4">
          {/* Overlay Content First */}
          <div className="text-center p-6 bg-hero-image rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {!isAnimated ? "Welcome Back!" : "Create Account"}
            </h2>
            {!isAnimated ? (
              <RightOverlayContent
                isAnimated={isAnimated}
                setIsAnimated={setIsAnimated}
              />
            ) : (
              <LeftOverlayContent
                isAnimated={isAnimated}
                setIsAnimated={setIsAnimated}
              />
            )}
          </div>
          {/* Form Card */}
          <Card className="w-full p-6">
            {!isAnimated ? <SigninForm /> : <SignupForm />}
          </Card>
        </div>
      ) : (
        /* Desktop View - Unchanged */
        <div className="container m-auto h-screen w-full relative overflow-hidden rounded-3xl">
          <div
            id="signin"
            className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out z-20 ${
              isAnimated ? "translate-x-full opacity-0" : ""
            }`}>
            <Card className="w-[90%] max-w-xl">
              <SigninForm />
            </Card>
          </div>

          <div
            id="signup"
            className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
              isAnimated
                ? "translate-x-full opacity-100 z-50 animate-show"
                : "opacity-0 z-10"
            }`}>
            <Card className="w-[90%] max-w-xl">
              <SignupForm />
            </Card>
          </div>

          <div
            id="overlay-container"
            className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-100 ${
              isAnimated ? "-translate-x-full" : ""
            }`}>
            <div
              id="overlay"
              className={`bg-hero-image relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
                isAnimated ? "translate-x-1/2" : "translate-x-0"
              }`}>
              <div
                id="overlay-left"
                className={`w-1/2 h-full absolute flex justify-center items-center top-0 transform -translate-x-[20%] transition-transform duration-700 ease-in-out text-black ${
                  isAnimated ? "translate-x-0" : "-translate-x-[20%]"
                }`}>
                <LeftOverlayContent
                  isAnimated={isAnimated}
                  setIsAnimated={setIsAnimated}
                />
              </div>
              <div
                id="overlay-right"
                className={`w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition-transform duration-700 ease-in-out ${
                  isAnimated ? "translate-x-[20%]" : "translate-x-0"
                }`}>
                <RightOverlayContent
                  isAnimated={isAnimated}
                  setIsAnimated={setIsAnimated}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
