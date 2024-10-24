import AdoptionCard from "@/components/adoption_section/adoption_card";
import Carousel from "@/components/adoption_section/carousel";
import SearchFilterSection from "@/components/adoption_section/search_filter_section";
import React from "react";

const AdoptionPage = () => {
  const mockData = [{ data: "1" }, { data: "2" }, { data: "3" }, { data: "4" }];
  return (
    <div>
      {/* <HeroComponent /> */}

      <Carousel />
      <div className="flex w-3/5 m-auto">
        <SearchFilterSection />
        <main className="grid grid-cols-3 w-4/6 mx-auto my-5 gap-6">
          {mockData?.map((c, i) => (
            <div className="col-span-1 row-span-1 " key={i}>
              <AdoptionCard />
              {c.data}
            </div>
          ))}
        </main>
      </div>

      {/* <AdoptionDetailPage /> */}
    </div>
  );
};

export default AdoptionPage;
