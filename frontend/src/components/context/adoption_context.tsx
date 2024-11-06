"use client";
import React, { createContext, useState } from "react";
import {
  AdoptionContextType,
  IAdoptionReq,
  IDonationTransactionData,
} from "@/interface";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import { toast } from "react-toastify";
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
  fetchSingleadoptionPosts: (_id: string | string[]) => {},
  refetch: false,
  setRefetch: () => {},
  createTransactionData: () => {},
  fetchTransactionData: (id: string | string[]) => {},
  getTransactionData: {
    amount: 0,
    description: "",
    donationId: "",
  },
  setGetTransactionData: () => {},
  insertTransactionData: {
    amount: 0,
    description: "",
    donationId: "",
  },
  setInsertTransactionData: () => {},
});

export const AdoptionProvider = ({ children }: AdoptionProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const [getTransactionData, setGetTransactionData] =
    useState<IDonationTransactionData>({
      amount: 0,
      description: "",
      donationId: "",
    });
  const [insertTransactionData, setInsertTransactionData] =
    useState<IDonationTransactionData>({
      amount: 0,
      description: "",
      donationId: "",
    });
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
        // console.log("SinglePost", response.data.getOnePost);
        setOneAdoptPost(response.data.getOnePost);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTransactionData = async (id: string | string[]) => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/v1/donation/transaction/${id}`
      );
      if (res.status === 200) {
        setGetTransactionData(res.data.transactionData);
        console.log("TD", res.data.transactionData);
      }
    } catch (error) {
      console.error("Error fetching donation transaction data:", error);
    }
  };

  const createTransactionData = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/donation/transaction`, {
        amount: insertTransactionData.amount,
        description: insertTransactionData.description,
        donationId: insertTransactionData.donationId,
      });
      if (res.status === 201) {
        toast.success("Donated successfully");
      }
    } catch (error) {
      toast.error("Couldn't send donation req");
      console.log("error", error);
    }
  };

  // console.log("Singlepost", oneAdoptPost);
  console.log("TRD", getTransactionData);

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
        createTransactionData,
        fetchTransactionData,
        getTransactionData,
        setGetTransactionData,
        insertTransactionData,
        setInsertTransactionData,
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};
