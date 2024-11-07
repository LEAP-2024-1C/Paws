import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroComponent = () => {
  return (
    <div className="bg-[#F8F9FA] w-full overflow-hidden">
      <section className="w-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left Section */}
          <div className="flex-1 relative flex items-center justify-center">
            {/* Decorative Images - Hidden on mobile */}
            <img
              src="/img/shape.png"
              alt=""
              className="w-16 md:w-20 lg:w-28 absolute top-[-20px] left-4 md:left-20 hidden md:block"
            />
            <img
              src="/img/parrot.png"
              alt=""
              className="w-20 md:w-28 lg:w-40 absolute top-8 right-4 md:right-12 hidden md:block"
            />

            {/* Content */}
            <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 max-w-xl ">
              <div className="flex flex-col gap-2 md:gap-3">
                <span className="text-[#FD7E14] text-sm md:text-base font-semibold">
                  Adopt A Pet
                </span>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
                  Find your best new friend
                </h1>
              </div>
              <p className="text-sm md:text-base text-gray-600 max-w-md ">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                tempora quia laboriosam?
              </p>
              <div className="flex ">
                <Link href="../adoption">
                  <Button className="w-36 md:w-40 text-sm md:text-base py-2 md:py-3">
                    Adopt Now
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bottom Shape - Hidden on mobile */}
            <img
              src="/img/shape.png"
              alt=""
              className="w-16 md:w-20 lg:w-28 absolute bottom-[-30px] right-4 md:right-20 hidden md:block"
            />
          </div>

          {/* Right Section */}
          <div className="flex-1 min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative mt-8 md:mt-0">
            <div
              style={{
                backgroundImage: "url('/img/image.png')",
              }}
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            />
            <img
              src="img/cat&dog.png"
              alt="Pets"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 md:w-3/4 object-contain"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroComponent;
