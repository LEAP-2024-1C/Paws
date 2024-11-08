"use client";
import AdoptionCard from "@/components/adoption_section/adoption_card";
import Carousel from "@/components/adoption_section/carousel";
import SearchFilterSection from "@/components/adoption_section/search_filter_section";
import { AdoptionContext } from "@/components/context/adoption_context";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AdoptionPage = () => {
  const { adoptionPosts } = useContext(AdoptionContext);
  const [petCategory, setPetCategory] = useState([
    {
      _id: "",
      name: "",
      description: "",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPetCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/pets/category`);
      if (response.status === 200) {
        // console.log("PetsCat", response.data.category);
        setPetCategory(response.data.category);
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
    }
  };

  useEffect(() => {
    fetchPetCategories();
  }, []);

  const filteredPets = adoptionPosts?.filter((pet) =>
    pet.pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("adoptionPposts", adoptionPosts);
  return (
    <div>
      <div className="hidden md:block">
        <Carousel />
      </div>
      <div className="bg-white py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-[#FD7E14]">500+</h3>
            <p className="text-gray-600">Pets Adopted</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#FD7E14]">100+</h3>
            <p className="text-gray-600">Available Pets</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#FD7E14]">50+</h3>
            <p className="text-gray-600">Partner Shelters</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-[#FD7E14]">1000+</h3>
            <p className="text-gray-600">Happy Families</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto my-20">
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <SearchFilterSection
            petCategory={petCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <main className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {filteredPets?.map((pet, i) => (
              <div
                key={i}
                className="w-full max-w-sm transform transition-transform duration-300 hover:scale-105"
              >
                <AdoptionCard
                  description={pet.description}
                  location={pet.location}
                  _id={pet._id}
                  pet={pet.pet}
                />
              </div>
            ))}
          </div>
        </main>
      </div>
      <div className="py-12 mt-12">
        <div className="max-w-[1400px] mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">How to Adopt</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#FD7E14] w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Browse Pets</h3>
              <p className="text-gray-600">Find your perfect companion</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FD7E14] w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Submit Application</h3>
              <p className="text-gray-600">Fill out adoption form</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FD7E14] w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Meet & Greet</h3>
              <p className="text-gray-600">Visit your potential pet</p>
            </div>
            <div className="text-center">
              <div className="bg-[#FD7E14] w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold mb-2">Welcome Home</h3>
              <p className="text-gray-600">Complete adoption process</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#FD7E14] text-white py-12">
        <div className="max-w-[1400px] mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Give a Pet a Home?
          </h2>
          <p className="mb-6">Start your adoption journey today</p>
          <button className="bg-white text-[#FD7E14] px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Start Adoption Process
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdoptionPage;
