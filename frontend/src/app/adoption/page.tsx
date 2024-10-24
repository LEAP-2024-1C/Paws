import AdoptionCard from "@/components/adoption_section/adoption_card";
import AdoptionDetailPage from "@/app/adoption_detail/page";
import Carousel from "@/components/adoption_section/carousel";
import SearchFilterSection from "@/components/adoption_section/search_filter_section";
import HeroComponent from "@/components/main_page/hero_component";
import React from "react";

const AdoptionPage = () => {
  const mockData = ["1", "2", "3", "4"];
  return (
    <div>
      {/* <HeroComponent /> */}

      <Carousel />
      <div className="flex w-3/5 m-auto">
        <SearchFilterSection />
        <main className="grid grid-cols-3 w-4/6 mx-auto my-5 gap-6">
          {mockData?.map((c, i) => (
            <div className="col-span-1 row-span-1">
              <AdoptionCard />
            </div>
          ))}
        </main>
      </div>

      {/* <AdoptionDetailPage /> */}
    </div>
  );
};

export default AdoptionPage;
