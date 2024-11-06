import { useState } from "react";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
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

const AdoptionCarousel = ({ cards }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col gap-6 sm:gap-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h3 className="text-2xl sm:text-3xl font-bold">Adopt me</h3>
          <div className="flex gap-2">
            <button
              className="bg-white p-1.5 sm:p-2 rounded-full shadow hover:shadow-md transition-shadow"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <TfiArrowCircleLeft className="text-2xl sm:text-4xl text-white bg-black rounded-full" />
            </button>
            <button
              className="bg-white p-1.5 sm:p-2 rounded-full shadow hover:shadow-md transition-shadow"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <TfiArrowCircleRight className="text-2xl sm:text-4xl text-white bg-black rounded-full" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {cards.map((card, i) => (
              <CarouselItem
                key={i}
                className="pl-1 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="p-1 mx-1">
                  <PetsCard
                    pet={card.pet}
                    _id={card._id}
                    key={i}
                    imgUrl={card.imgUrl}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default AdoptionCarousel;
