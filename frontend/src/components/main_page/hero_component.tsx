import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroComponent = () => {
  return (
    <div className="bg-[#F8F9FA] w-full py-8 md:py-12 lg:py-16">
      <section className="w-full px-4 md:w-4/5 lg:w-3/5 flex flex-col md:flex-row mx-auto">
        {/* Left Section */}
        <div className="flex flex-1 relative overflow-hidden items-center mb-8 md:mb-0">
          {/* Decorative Images */}
          <img
            src="/img/shape.png"
            alt=""
            className="w-20 md:w-28 absolute top-[-20px] md:top-[-60px] left-4 md:left-60 hidden md:block"
          />
          <img
            src="/img/parrot.png"
            alt=""
            className="w-28 md:w-40 absolute top-8 md:top-16 right-4 md:right-32 hidden md:block"
          />

          {/* Content */}
          <div className="flex flex-col gap-6 md:gap-10 w-full md:w-2/3 z-10">
            <div className="flex flex-col gap-2">
              <span className="text-[#FD7E14] text-sm md:text-base font-semibold">
                Adopt A Pet
              </span>
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Find your best new friend
              </h1>
            </div>
            <p className="text-sm md:text-base text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              tempora quia laboriosam?
            </p>
            <Link href="../adoption">
              <Button className="w-32 text-sm md:text-base">Adopt Now</Button>
            </Link>
          </div>

          {/* Bottom Shape */}
          <img
            src="/img/shape.png"
            alt=""
            className="w-20 md:w-28 absolute bottom-[-30px] md:bottom-[-70px] right-4 md:right-60 hidden md:block"
          />
        </div>

        {/* Right Section */}
        <div
          style={{
            backgroundImage: "url('/img/image.png')",
          }}
          className="flex items-end justify-center flex-1 h-48 sm:h-64 md:h-96 bg-no-repeat bg-cover md:bg-[length:100%] bg-center mt-4 md:mt-0"
        >
          <img
            src="img\cat&dog.png"
            alt=""
            className="w-2/3 sm:w-3/5 md:w-3/5 object-contain"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroComponent;
