"use client";
import AdoptionCard from "@/components/adoption_section/adoption_card";
import Carousel from "@/components/adoption_section/carousel";
import SearchFilterSection from "@/components/adoption_section/search_filter_section";
import { AdoptionContext } from "@/components/context/adoption_context";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

const StatsSkeleton = () => (
  <div className="text-center">
    <Skeleton className="h-8 w-20 mx-auto mb-2" />
    <Skeleton className="h-4 w-32 mx-auto" />
  </div>
);

const FilterSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-full" />
    <div className="space-y-4">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  </div>
);

const AdoptionCardSkeleton = () => (
  <div className="w-full max-w-sm rounded-lg border">
    <Skeleton className="h-48 w-full rounded-t-lg" />
    <div className="p-4 space-y-4">
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  </div>
);

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
  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  const fetchPetCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/api/v1/pets/category`);
      if (response.status === 200) {
        // console.log("PetsCat", response.data.category);
        setPetCategory(response.data.category);
      }
    } catch (error) {
      console.error("Error fetching pet data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Fetch your data here
      // After fetching data, set loading to false
      setIsLoading(false);
      setIsContentLoaded(true); // Trigger content loaded state
    };

    fetchData();
  }, []);

  const filteredPets = adoptionPosts?.filter((pet) => {
    const nameMatch = pet.pet?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const speciesMatch =
      selectedSpecies === "" || pet.pet.category === selectedSpecies;
    return nameMatch && speciesMatch;
  });

  // console.log("adoptionPposts", adoptionPosts);
  return (
    <div>
      <div className="hidden md:block">
        <Carousel />
      </div>
      <div className="bg-white py-8 md:py-12">
        <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <StatsSkeleton key={i} />)
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 w-full px-4 sm:px-6 lg:px-8 max-w-[1500px] mx-auto my-20">
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          {isLoading ? (
            <FilterSkeleton />
          ) : (
            <SearchFilterSection
              petCategory={petCategory}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSpecies={selectedSpecies}
              setSelectedSpecies={setSelectedSpecies}
            />
          )}
        </div>

        <motion.main
          className="w-full lg:w-3/4"
          initial={{ opacity: 0, y: 20 }}
          animate={isContentLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <AdoptionCardSkeleton key={i} />
                ))
              : filteredPets?.map((pet, i) => (
                  <motion.div
                    key={i}
                    className="w-full max-w-sm transform transition-transform duration-300 hover:scale-105"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AdoptionCard
                      description={pet.description}
                      location={pet.location}
                      _id={pet._id}
                      pet={pet.pet}
                    />
                  </motion.div>
                ))}
          </div>
        </motion.main>
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
