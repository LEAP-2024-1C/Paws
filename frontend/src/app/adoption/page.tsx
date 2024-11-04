"use client";
import AdoptionCard from "@/components/adoption_section/adoption_card";
import Carousel from "@/components/adoption_section/carousel";
import SearchFilterSection from "@/components/adoption_section/search_filter_section";
import { AdoptionContext } from "@/components/context/adoption_context";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AdoptionPage = () => {
  const { adoptionPosts, fetchAllAdoptionData } = useContext(AdoptionContext);
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
    fetchAllAdoptionData();
    fetchPetCategories();
  }, []);

  const filteredPets = adoptionPosts?.filter((pet) =>
    pet.pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log("adoptionPposts", adoptionPosts);
  return (
    <div>
      {/* <HeroComponent /> */}

      <Carousel />
      <div className="flex flex-col w-4/5 xl:flex-row md:w-3/5 m-auto my-24">
        <div className="mx-auto ">
          <SearchFilterSection
            petCategory={petCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-4/6 mx-auto gap-6">
          {filteredPets?.map((pet, i) => (
            <div className="col-span-1 row-span-1 " key={i}>
              <AdoptionCard
                // title={pet.title}
                description={pet.description}
                location={pet.location}
                _id={pet._id}
                // imgUrl={pet.imgUrl}
                pet={pet.pet}
              />
            </div>
          ))}
        </main>
      </div>

      {/* <AdoptionDetailPage /> */}
    </div>
  );
};

export default AdoptionPage;
