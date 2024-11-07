import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import HomeDonationCard from "./donation_card";
interface ICards {
  title: string;
  _id: string;
  description: string;
  totalAmount: number;
  images: string;
}

interface CarouselProps {
  cards: ICards[];
}

export default function DonationSwiper({ cards }: CarouselProps) {
  return (
    <>
      <Swiper
        className="mySwiper"
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
      >
        {cards?.map((card, i) => (
          <SwiperSlide key={i}>
            <HomeDonationCard
              title={card.title}
              _id={card._id}
              description=""
              images={card.images}
              totalAmount={0}
              updateDate={""}
              currentAmount={0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
