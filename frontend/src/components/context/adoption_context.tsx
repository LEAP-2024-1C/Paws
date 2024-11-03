"use client";
import React, { createContext, useEffect, useState } from "react";
import { AdoptionContextType, IAdoptionReq } from "@/interface";
import { apiUrl } from "@/utils/util";
import axios from "axios";
// import { useRouter } from "next/navigation";

type AdoptionProviderProps = {
  children: React.ReactNode;
};

export const AdoptionContext = createContext<AdoptionContextType>({
  adoptionPosts: [],
  setAdoptionPosts: () => {},
  oneAdoptPost: {
    _id: "",
    title: "",
    description: "",
    location: "",
    status: "",
    imgUrl: [],
    pet: {
      _id: "",
      name: "",
      age: 0,
      ageGroup: "",
      breed: "",
      createdAt: "",
      gender: "male",
      healthCondition: "healthy",
      imageUrl: [""],
      size: "",
      spayed: true,
      updatedAt: "",
      vaccinated: true,
      wormed: true,
    },
  },
  setOneAdoptPost: () => {},
  fetchAllAdoptionData: () => {},
  fetchSingleadoptionPosts: (id: string | string[]) => {},
  refetch: false,
  setRefetch: () => {},
});

export const AdoptionProvider = ({ children }: AdoptionProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const [adoptionPosts, setAdoptionPosts] = useState<IAdoptionReq[]>([]);
  const [oneAdoptPost, setOneAdoptPost] = useState<IAdoptionReq>({
    _id: "",
    title: "",
    description: "",
    location: "",
    status: "",
    imgUrl: [],
    pet: {
      _id: "",
      name: "",
      age: 0,
      ageGroup: "",
      breed: "",
      createdAt: "",
      gender: "male",
      healthCondition: "healthy",
      imageUrl: [""],
      size: "",
      spayed: true,
      updatedAt: "",
      vaccinated: true,
      wormed: true,
    },
  });

  // const router = useRouter();

  const fetchAllAdoptionData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/adoption`);
      if (response.status === 200) {
        // console.log("Petss", response.data.getAllPosts);
        setAdoptionPosts(response.data.getAllPosts);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchSingleadoptionPosts = async (id: string | string[]) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/adoption/${id}`);
      if (response.status === 200) {
        console.log("SinglePost", response.data.getOnePost);
        setOneAdoptPost(response.data.getOnePost);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // console.log("Singlepost", oneAdoptPost);

  return (
    <AdoptionContext.Provider
      value={{
        adoptionPosts,
        setAdoptionPosts,
        oneAdoptPost,
        setOneAdoptPost,
        fetchAllAdoptionData,
        refetch,
        setRefetch,
        fetchSingleadoptionPosts,
      }}>
      {children}
    </AdoptionContext.Provider>
  );
};
