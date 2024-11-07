import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import PetsCard from "./adoption_card";
interface ICards {
  _id: string;
  imgUrl: string[];
  pet: {
    name: string;
    imageUrl: string[];
  };
}

interface CarouselProps {
  cards: ICards[];
}

export default function AdoptionSwiper({ cards }: CarouselProps) {
  return (
    <Swiper
      className="mySwiper"
      slidesPerView={1}
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
        <SwiperSlide
          key={i}
          className="p-4 transition-transform duration-300 hover:scale-105">
          <PetsCard
            pet={card.pet}
            _id={card._id}
            key={i}
            imgUrl={card.imgUrl}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
