import React from "react";

import { Fredoka } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"] });

const RightOverlayContent = ({ isAnimated, setIsAnimated }: any) => {
  return (
    <div className="p-8 text-center">
      <h1 className={`${fredoka.className} text-6xl font-bold  mb-4`}>
        Don&#39;t have an account ?
      </h1>

      <h5 className={`${fredoka.className} text-xl `}>
        Start your journey in one click
      </h5>
      <div className="mt-16">
        <button
          className={`${fredoka.className} py-3 px-6 bg-transparent rounded-full text-center font-bold uppercase ring-2 ring-[#FD7E14] active:scale-110 transition-transform ease-in`}
          onClick={(e) => {
            setIsAnimated(!isAnimated);
          }}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default RightOverlayContent;
