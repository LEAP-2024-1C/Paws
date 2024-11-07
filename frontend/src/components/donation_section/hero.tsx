import React from "react";
import { Button } from "../ui/button";
const DonationHero = () => {
  return (
    <div className="bg-[#F8F9FA] w-full py-8 md:py-12">
      <section className="w-[90%] md:w-4/5 lg:w-3/5 flex flex-col md:flex-row m-auto">
        <div className="flex flex-1 relative overflow-hidden items-center p-4 md:p-0">
          <img
            src="/img/shape.png"
            alt=""
            className="hidden md:block w-28 absolute top-[-60px] left-60"
          />
          <img
            src="/img/parrot.png"
            alt=""
            className="hidden md:block w-40 absolute top-16 right-32"
          />
          <div className="flex flex-col gap-6 md:gap-10 w-full md:w-2/3 z-10 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <span className="text-[#FD7E14] text-base font-semibold">
                Donate to Pets
              </span>
              <h1 className="font-bold text-3xl md:text-5xl">
                All paws need help
              </h1>
            </div>
            <p className="text-sm md:text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              tempora quia laboriosam?
            </p>
            <Button className="w-32 mx-auto md:mx-0">Donate Now</Button>
          </div>
          <img
            src="/img/shape.png"
            alt=""
            className="hidden md:block w-28 absolute bottom-[-70px] right-60"
          />
        </div>
        <div
          style={{
            backgroundImage: "url('/img/image.png')",
          }}
          className={`flex items-end justify-center flex-1 h-64 md:h-96 bg-no-repeat z-0 bg-cover md:bg-[length:100%] bg-center mt-8 md:mt-0`}
        >
          <img src="img\cat&dog.png" alt="" className="w-4/5 md:w-3/5" />
        </div>
      </section>
    </div>
  );
};

export default DonationHero;
