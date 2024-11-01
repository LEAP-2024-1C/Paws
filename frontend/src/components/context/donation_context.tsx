"use client";

import { createContext, useEffect, useState } from "react";
import { apiUrl } from "@/utils/util";
import axios from "axios";

type DonationProviderProps = {
  children: React.ReactNode;
};
interface IDonationReq {
  _id: string;
  title: string;
  description: string;
  images: string;
  totalAmount: number;
  updateDate: Date;
}
interface DonationContextType {
  donationPosts: IDonationReq[];
  setDonationPosts: React.Dispatch<React.SetStateAction<IDonationReq[]>>;
  oneDonationPost: IDonationReq;
  setOneDonationPost: React.Dispatch<React.SetStateAction<IDonationReq>>;
  fetchAllDonationData: () => void;
  fetchSingleDonationPosts: (id: string | string[]) => void;
  refetch?: boolean;
  setRefetch?: (refetch: boolean) => void;
}
export const DonationContext = createContext<DonationContextType>({
  donationPosts: [],
  setDonationPosts: () => {},
  oneDonationPost: {
    _id: "",
    title: "",
    description: "",
    images: "",
    totalAmount: 0,
    updateDate: new Date(),
  },
  setOneDonationPost: () => {},
  fetchAllDonationData: () => {},
  fetchSingleDonationPosts: (id: string | string[]) => {},
  refetch: false,
  setRefetch: () => {},
});
export const DonationProvider = ({ children }: DonationProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const [donationPosts, setDonationPosts] = useState<IDonationReq[]>([]);
  const [oneDonationPost, setOneDonationPost] = useState<IDonationReq>({
    _id: "",
    title: "",
    description: "",
    images: "",
    totalAmount: 0,
    updateDate: new Date(),
  });

  const fetchAllDonationData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation`);
      if (response.status === 200) {
        console.log("Pets", response.data.allDonations);
        setDonationPosts(response.data.allDonations);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchSingleDonationPosts = async (id: string | string[]) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation/${id}`);
      if (response.status === 200) {
        console.log("SinglePost", response.data.getSinglePost);
        setOneDonationPost(response.data.getSinglePost);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchAllDonationData();
  }, []);

  console.log("Singlepost", oneDonationPost);

  return (
    <DonationContext.Provider
      value={{
        donationPosts,
        setDonationPosts,
        oneDonationPost,
        setOneDonationPost,
        fetchAllDonationData,
        refetch,
        setRefetch,
        fetchSingleDonationPosts,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
