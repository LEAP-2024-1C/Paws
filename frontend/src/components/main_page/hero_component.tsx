import React from "react";
import { Button } from "../ui/button";

const HeroComponent = () => {
  return (
    <div className="bg-[#F8F9FA] h-1/3 w-full">
      <section className="w-3/5 flex m-auto">
        <div className="flex flex-1 relative overflow-hidden items-center">
          <img
            src="/img/shape.png"
            alt=""
            className="w-28 absolute top-[-60px] left-60"
          />
          <img
            src="/img/parrot.png"
            alt=""
            className="w-40 absolute top-16 right-32"
          />
          <div className="flex flex-col gap-10 w-2/3 z-10">
            <div className="flex flex-col gap-2">
              <span className="text-[#FD7E14] text-base font-semibold">
                Adopt A Pet
              </span>
              <h1 className="font-bold text-5xl">Find your best new friend </h1>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
              tempora quia laboriosam?
            </p>
            <Button className="w-32">Adopt Now</Button>
          </div>
          <img
            src="/img/shape.png"
            alt=""
            className="w-28 absolute bottom-[-70px] right-60"
          />
        </div>
        <div
          style={{
            backgroundImage: "url('/img/image.png')",
          }}
          className={`flex items-end justify-center flex-1 h-96 bg-no-repeat z-0 bg-[length:100%] bg-center`}>
          <img src="img\cat&dog.png" alt="" className="w-3/5" />
        </div>
      </section>
    </div>
  );
};

export default HeroComponent;
