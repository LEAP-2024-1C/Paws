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

  images: string[];
}

interface CarouselProps {
  cards: ICards[];
}

export default function DonationSwiper({ cards }: CarouselProps) {
  return (
    <>
      <Swiper
        className="mySwiper"
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}>
        {cards?.map((card, i) => (
          <SwiperSlide key={i}>
            <HomeDonationCard
              title={card.title}
              _id={card._id}
              images={card.images || []}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
