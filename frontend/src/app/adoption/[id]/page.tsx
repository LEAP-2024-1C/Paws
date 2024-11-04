"use client";
import {
  ContactDetail,
  ImageCard,
  InfoCard,
  MoreDetails,
} from "@/components/adoption_section/detail_card";
import { AdoptionContext } from "@/components/context/adoption_context";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const AdoptionDetailPage = () => {
  const { id } = useParams();
  const { fetchSingleadoptionPosts } = useContext(AdoptionContext);

  useEffect(() => {
    fetchSingleadoptionPosts(id);
  }, [id]);

  // console.log("ID", id);

  return (
    <div className="">
      <div className="bg-[#F8F9FA] h-1/3 w-full">
        <section className="w-3/5 flex m-auto">
          <div className="flex flex-1 relative overflow-hidden items-center h-20">
            <div>
              <img
                src="/img/shape.png"
                alt=""
                className="w-28 absolute top-[-60px] left-60 z-20"
              />
            </div>
          </div>
        </section>
      </div>
      <div className="grid grid-cols-3 w-3/4 m-auto gap-10 my-24">
        <div className="col-span-2">
          <InfoCard />
        </div>
        <div className="col-span-1 row-span-3 flex flex-col gap-10">
          <ImageCard />
          <MoreDetails />
        </div>
        <div className="col-span-2">
          <ContactDetail />
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetailPage;
