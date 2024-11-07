import { useState } from "react";
import HomeDonationCard from "./donation_card";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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

const DonationCarousel = ({ cards }: CarouselProps) => {
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
    <section className="w-full px-4 md:px-6 lg:px-8">
      <div className="flex flex-col gap-6 md:gap-10 max-w-[1300px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-10 md:mt-20 gap-4">
          <h3 className="text-2xl md:text-3xl font-bold">Donation</h3>
          <div className="flex gap-2">
            <button
              className="bg-white p-1.5 md:p-2 rounded-full shadow hover:shadow-lg transition-shadow"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <TfiArrowCircleLeft className="text-2xl md:text-4xl text-white bg-black border rounded-full" />
            </button>
            <button
              className="bg-white p-1.5 md:p-2 rounded-full shadow hover:shadow-lg transition-shadow"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <TfiArrowCircleRight className="text-2xl md:text-4xl text-white bg-black border rounded-full" />
            </button>
          </div>
        </div>
        {/* Carousel Section */}
        <Carousel className="w-full">
          <CarouselContent className="-ml-1 md:-ml-2">
            {cards.map((card, i) => (
              <CarouselItem
                key={i}
                className="pl-1 md:pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                <div className="h-full mx-1">
                  <HomeDonationCard
                    title={card.title}
                    _id={card._id}
                    description=""
                    images={card.images}
                    totalAmount={0}
                    updateDate={""}
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

export default DonationCarousel;
