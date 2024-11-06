"use client";
import React from "react";

import "swiper/css";

export default function Carousel() {
  return (
    <div className="bg-[#F8F9FA] w-full ">
      <section className="w-full md:w-4/5 lg:w-3/5 flex flex-col md:flex-row mx-auto px-4 md:px-0">
        {/* Left Section */}
        <div className="flex flex-1 relative overflow-hidden items-center mb-8 md:mb-0">
          <img
            src="/img/shape.png"
            alt=""
            className="w-20 md:w-28 absolute top-[-20px] md:top-[-30px] left-4 md:left-60"
          />
          <img
            src="/img/parrot.png"
            alt=""
            className="w-28 md:w-40 absolute top-8 md:top-16 right-4 md:right-12"
          />
          <div className="flex flex-col gap-6 md:gap-10 w-full md:w-2/3 z-10">
            <div className="flex flex-col gap-2">
              <span className="text-[#FD7E14] text-sm md:text-base font-semibold">
                Adopt A Pet
              </span>
              <h1 className="font-bold text-3xl md:text-5xl">
                Find your best new friend
              </h1>
            </div>
            <p className="text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              tempora quia laboriosam?
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div
          style={{
            backgroundImage: "url('/img/image.png')",
          }}
          className="flex items-end justify-center flex-1 h-64 md:h-96 bg-no-repeat bg-[length:100%] bg-bottom">
          <img
            src="https://i.ibb.co/tDwSPg9/kitty.png"
            alt=""
            className="w-1/2 md:w-1/2"
          />
        </div>
      </section>
    </div>
  );
}
