"use client";
import React, { useContext, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";

export default function Carousel() {
  const mockData = ["1", "2", "3", "4"];
  return (
    <>
      <Swiper
        className="mySwiper"
        // autoplay={{
        //   delay: 4500,
        //   disableOnInteraction: false,
        // }}
        // navigation={true}
        // modules={[Autoplay, Navigation]}
      >
        {mockData.slice(0, 5).map((prod) => (
          <SwiperSlide className="relative">
            <div className="relative w-full h-96">
              {/* <div className="z-20 absolute m-auto left-[40%]">
                <img
                  src={prod.images[0]}
                  alt=""
                  className="object-contain w-80"
                />
              </div> */}
              <div
                style={{
                  // backgroundImage: `url(${prod.images[0]})`,
                  backgroundImage:
                    "url('https://www.shutterstock.com/image-vector/cartoon-paws-cat-set-vector-260nw-2121437939.jpg')",
                }}
                className={`w-full h-96 bg-no-repeat z-0 bg-[length:100%] bg-center`}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
