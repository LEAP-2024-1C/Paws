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
    <div className="min-h-screen bg-[#F8F9FA] py-24">
      {/* Hero Section */}
      <div className="relative  overflow-hidden">
        <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-10"></div>

        {/* Decorative Bottom Wave */}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          <div className="lg:col-span-2 space-y-6">
            <InfoCard />
            <ContactDetail />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <ImageCard />
            <MoreDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdoptionDetailPage;
