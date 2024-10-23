import AdoptionCard from "@/components/adoption_section/adoption_card";
import Carousel from "@/components/adoption_section/carousel";
import HeroComponent from "@/components/main_page/hero_component";
import React from "react";

const AdoptionPage = () => {
  const mockData = ["1", "2", "3", "4"];
  return (
    <div>
      <HeroComponent />
      {/* <Carousel />
      <main className="grid grid-cols-3 w-4/6 mx-auto my-5 gap-6">
        {mockData?.map((c, i) => (
          <div className="col-span-1 row-span-1">
            <AdoptionCard />
          </div>
        ))}
      </main> */}
    </div>
  );
};

export default AdoptionPage;
