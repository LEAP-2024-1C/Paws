'use client';
// import LoginDesktop from "@/components/login-signUp/Desktop";
import LeftOverlayContent from '@/components/login-signUp/LeftOverlayContent';
// import Phone from "@/components/login-signUp/Phone";
import RightOverlayContent from '@/components/login-signUp/RightOverlayContent';
import SigninForm from '@/components/login-signUp/SigninForm';
import SignupForm from '@/components/login-signUp/SignupForm';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const { toast } = useToast();
  const [isAnimated, setIsAnimated] = useState(false);

  return (
    <div className="bg-[#F8F9FA]">
      {/* <LoginDesktop /> */}
      {/* <Phone /> */}
      <div className="">
        <div className="container relative m-auto h-screen w-full overflow-hidden rounded-3xl ">
          <div
            id="signin"
            className={` absolute left-0 top-0 z-20 flex h-full w-1/2 items-center justify-center transition-all duration-700 ease-in-out ${
              isAnimated ? 'translate-x-full opacity-0' : ''
            }`}
          >
            <Card>
              <SigninForm />
            </Card>
          </div>

          <div
            id="signup"
            className={` absolute left-0 top-0 flex h-full w-1/2 items-center justify-center transition-all duration-700 ease-in-out ${
              isAnimated
                ? 'animate-show z-50 translate-x-full opacity-100'
                : 'z-10 opacity-0'
            }`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Card>
                <SignupForm />
              </Card>
            </div>
          </div>

          <div
            id="overlay-container"
            className={`z-100 absolute left-1/2 top-0 h-full w-1/2 overflow-hidden transition-transform duration-700 ease-in-out ${
              isAnimated ? '-translate-x-full' : ''
            }`}
          >
            <div
              id="overlay"
              className={`bg-hero-image relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
                isAnimated ? 'translate-x-1/2' : 'translate-x-0'
              }`}
            >
              <div
                id="overlay-left"
                className={`absolute top-0 flex h-full w-1/2 -translate-x-[20%] transform items-center justify-center text-black transition-transform duration-700 ease-in-out ${
                  isAnimated ? 'translate-x-0' : '-translate-x-[20%]'
                }`}
              >
                <LeftOverlayContent
                  isAnimated={isAnimated}
                  setIsAnimated={setIsAnimated}
                />
              </div>
              <div
                id="overlay-right"
                className={`absolute right-0 top-0 flex h-full w-1/2 transform items-center justify-center transition-transform duration-700 ease-in-out ${
                  isAnimated ? 'translate-x-[20%]' : 'translate-x-0'
                }`}
              >
                <RightOverlayContent
                  isAnimated={isAnimated}
                  setIsAnimated={setIsAnimated}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
