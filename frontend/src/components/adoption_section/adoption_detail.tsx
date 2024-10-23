"use client";
import React from "react";
import { ContactDetail, InfoCard, MoreDetails } from "./detail_card";

const AdoptionDetailPage = () => {
  return (
    <div className="">
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
              className="w-40 absolute top-16 right-16"
            />
            <div className="flex flex-col gap-10 w-2/3 z-10">
              <div className="flex flex-col gap-2">
                <h1 className=" font-bold text-5xl">Adopt Me </h1>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla
                tempora quia laboriosam?
              </p>
            </div>
            <img
              src="/img/shape.png"
              alt=""
              className="w-28 absolute bottom-[-70px] right-60"
            />
          </div>
          <div
            // style={{
            //   backgroundImage: "url('/img/image.png')",
            // }}
            className={`flex items-end justify-center flex-1 h-96 bg-no-repeat z-0 bg-[length:100%] bg-center`}>
            <img
              src="https://res.cloudinary.com/petrescue/image/upload/a_0,c_crop,h_900,w_900,x_0,y_513/c_fill,h_648,w_648/ht4tbzwlmleirzzoo1pj.jpg"
              alt=""
              className="w-4/6"
            />
          </div>
        </section>
      </div>
      <div className="grid grid-cols-3 w-3/4 m-auto gap-10 my-24">
        <div className="col-span-2">
          <InfoCard />
        </div>
        <div className="col-span-1 row-span-2">
          <MoreDetails />
        </div>
        <div className="col-span-2">
          <ContactDetail />
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetailPage;
