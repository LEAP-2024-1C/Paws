'use client';
import React, { createContext, useEffect, useState } from 'react';
import { PetsContextType, IPets, IPetCategory } from '@/app/interface';
import { apiUrl } from '@/utils/util';
import axios from 'axios';
// import { useRouter } from "next/navigation";

type PetsProviderProps = {
  children: React.ReactNode;
};

export const PetsContext = createContext<PetsContextType>({
  getPetData: [
    {
      _id: '',
      name: '',
      breed: '',
      age: 0,
      ageGroup: '',
      gender: '',
      healthCondition: '',
      size: '',
      vaccinated: true,
      spayed: true,
      neutered: true,
      wormed: true,
      category: ''
    }
  ],
  setGetPetData: () => {},
  fetchAllPetsData: () => {},
  fetchPetData: (id: string | string[]) => {},
  refetch: false,
  setRefetch: () => {},
  petCategory: [
    {
      _id: '',
      name: '',
      description: ''
    }
  ],
  setPetCategory: () => {}
});

export const PetsProvider = ({ children }: PetsProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const [getPetData, setGetPetData] = useState<IPets[]>([
    {
      _id: '',
      name: '',
      breed: '',
      age: 0,
      ageGroup: '',
      gender: '',
      healthCondition: '',
      size: '',
      vaccinated: true,
      spayed: true,
      neutered: true,
      wormed: true,
      category: ''
    }
  ]);
  const [imageUrl, setImageUrl] = useState('');
  const [petCategory, setPetCategory] = useState<IPetCategory[]>([
    {
      _id: '',
      name: '',
      description: ''
    }
  ]);

  // const router = useRouter();

  const fetchAllPetsData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/pets`);
      if (response.status === 200) {
        console.log('Petss', response.data.allPets);
        setGetPetData(response.data.allPets);
      }
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  const fetchPetData = async (id: string | string[]) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/pets/${id}`);
      if (response.status === 200) {
        console.log('SinglePost', response.data.getOnePost);
        // setOneAdoptPost(response.data.getOnePost);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchPetCategories = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/pets/category`);
      if (response.status === 200) {
        console.log('PetsCat', response.data.category);
        setPetCategory(response.data.category);
      }
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }
  };

  useEffect(() => {
    fetchAllPetsData();
    fetchPetCategories();
  }, []);

  // console.log('Cats', petCategory);

  return (
    <PetsContext.Provider
      value={{
        getPetData,
        setGetPetData,
        fetchAllPetsData,
        refetch,
        setRefetch,
        fetchPetData,
        petCategory,
        setPetCategory
      }}
    >
      {children}
    </PetsContext.Provider>
  );
};
