import { useState } from "react";
import HomeDonationCard from "./donation_card";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

const Carousel = ({ cards }) => {
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
    <>
      <section className="flex flex-col gap-10">
        <div className="flex justify-between mt-20 md:w-[1300px] mx-auto">
          <h3 className="text-3xl font-bold">Donation</h3>
          <div className="flex gap-2">
            <button
              className="bg-white p-2 rounded-full shadow"
              onClick={handlePrev}
            >
              <TfiArrowCircleLeft className="text-4xl text-white bg-black border rounded-full" />
            </button>
            <button
              className="bg-white p-2 rounded-full shadow"
              onClick={handleNext}
            >
              <TfiArrowCircleRight className="text-4xl text-white bg-black border rounded-full" />
            </button>
          </div>
        </div>
        <div className="w-full max-w-4xl mx-auto overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="flex justify-center md:basis-1/5 lg:basis-1/4"
              >
                <HomeDonationCard
                  title={card.title}
                  _id={card._id}
                  description=""
                  images={card.images}
                  totalAmount={0}
                  updateDate={0}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Carousel;
