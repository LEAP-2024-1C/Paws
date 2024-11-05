"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import { UserContext } from "./user_context";
import { toast } from "react-toastify";

type DonationProviderProps = {
  children: React.ReactNode;
};

interface IComment {
  id: number;
  name: string;
  comment: string;
}

interface IDonationReq {
  _id: string;
  title: string;
  description: string;
  images: string;
  totalAmount: number;
  updateDate: Date;
  comments?: IComment[];
  newComments?: IComment[];
}

interface DonationContextType {
  comment: string;
  setComment: (comment: string) => void;
  newComment: (id: string | string[]) => Promise<void>;
  donationPosts: IDonationReq[];
  setDonationPosts: React.Dispatch<React.SetStateAction<IDonationReq[]>>;
  oneDonationPost: IDonationReq;
  setOneDonationPost: React.Dispatch<React.SetStateAction<IDonationReq>>;
  fetchAllDonationData: () => void;
  fetchSingleDonationPosts: (id: string | string[]) => void;
  refetch: boolean;
  setRefetch: (refetch: boolean) => void;
}

export const DonationContext = createContext<DonationContextType>({
  comment: "",
  setComment: () => {},
  newComment: async () => {},
  donationPosts: [],
  setDonationPosts: () => {},
  oneDonationPost: {
    _id: "",
    title: "",
    description: "",
    images: "",
    totalAmount: 0,
    updateDate: new Date(),
    comments: [],
  },
  setOneDonationPost: () => {},
  fetchAllDonationData: () => {},
  fetchSingleDonationPosts: () => {},
  refetch: false,
  setRefetch: () => {},
});

export const DonationProvider = ({ children }: DonationProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [donationPosts, setDonationPosts] = useState<IDonationReq[]>([]);
  const [oneDonationPost, setOneDonationPost] = useState<IDonationReq>({
    _id: "",
    title: "",
    description: "",
    images: "",
    totalAmount: 0,
    updateDate: new Date(),
    comments: [],
  });

  const fetchAllDonationData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation`);
      if (response.status === 200) {
        setDonationPosts(response.data.allDonations);
      }
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  const fetchSingleDonationPosts = async (id: string | string[]) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation/${id}`);
      if (response.status === 200) {
        setOneDonationPost(response.data.getSinglePost);
      }
    } catch (error) {
      console.error("Error fetching single donation post:", error);
    }
  };

  const newComment = async (id: string | string[]) => {
    try {
      const res = await axios.post(`${apiUrl}/api/v1/donation/${id}`, {
        comment,
        user,
      });
      if (res.status === 200) {
        toast.success("Added comment successfull");
        setComment("");
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to post comment");
    }
  };

  useEffect(() => {
    fetchAllDonationData();
  }, [refetch]);

  return (
    <DonationContext.Provider
      value={{
        comment,
        setComment,
        newComment,
        donationPosts,
        setDonationPosts,
        oneDonationPost,
        setOneDonationPost,
        fetchAllDonationData,
        fetchSingleDonationPosts,
        refetch,
        setRefetch,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};
