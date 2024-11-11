"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import { UserContext } from "./user_context";
import { toast } from "react-toastify";
import { IDonationTransactionData } from "@/interface";

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
  currentAmount: number;
  updatedAt: Date;
  comments?: IComment[];
  newComments?: IComment[];
  collectedDonations?: {
    description: string;
    amount: number;
    userName: string;
  }[];
  userId: {
    firstname: string;
    lastname: string;
  };
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
  createTransactionData: (id: string | string[]) => void;
  insertTransactionData: IDonationTransactionData;
  setInsertTransactionData: React.Dispatch<
    React.SetStateAction<IDonationTransactionData>
  >;
  loading: boolean;
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
    currentAmount: 0,
    updatedAt: new Date(),
    comments: [],
    collectedDonations: [
      {
        description: "",
        amount: 0,
        userName: "",
      },
    ],
    userId: {
      firstname: "",
      lastname: "",
    },
  },
  setOneDonationPost: () => {},
  fetchAllDonationData: () => {},
  fetchSingleDonationPosts: (_id: string | string[]) => {},
  refetch: false,
  setRefetch: () => {},
  insertTransactionData: {
    amount: 0,
    description: "",
    donationId: "",
    userName: "",
  },
  setInsertTransactionData: () => {},
  createTransactionData: (_id: string | string[]) => {},
  loading: false,
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
    currentAmount: 0,
    updatedAt: new Date(),
    comments: [],
    collectedDonations: [
      {
        description: "",
        amount: 0,
        userName: "",
      },
    ],
    userId: {
      firstname: "",
      lastname: "",
    },
  });
  const [insertTransactionData, setInsertTransactionData] =
    useState<IDonationTransactionData>({
      amount: 0,
      description: "",
      donationId: "",
      userName: "",
    });

  const fetchAllDonationData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation`);
      if (response.status === 200) {
        const allDonations = response.data.allDonations.map(
          (donation: IDonationReq) => {
            const total =
              donation.collectedDonations?.reduce(
                (sum: number, donation: { amount: number }) =>
                  sum + donation.amount,
                0
              ) || 0;
            return { ...donation, currentAmount: total };
          }
        );
        setDonationPosts(allDonations);
      }
    } catch (error) {
      console.error("Error fetching donation data:", error);
    }
  };

  const fetchSingleDonationPosts = async (id: string | string[]) => {
    try {
      const response = await axios.get(`${apiUrl}/api/v1/donation/${id}`);
      if (response.status === 200) {
        const post = response.data.getSinglePost;
        // Calculate total amount from collectedDonations
        const total =
          post.collectedDonations?.reduce(
            (sum: number, donation: { amount: number }) =>
              sum + donation.amount,
            0
          ) || 0;

        setOneDonationPost({
          ...post,
          currentAmount: total,
        });
      }
    } catch (error) {
      console.error("Error fetching single donation post:", error);
    }
  };

  // const createTransactionData = async (data: CreateTransactionData) => {
  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           description: data.description,
  //           amount: data.amount,
  //           donationId: data.donationId,
  //           userId: data.userId,
  //           status: data.status || "pending",
  //           paymentMethod: data.paymentMethod || "card",
  //           transactionNumber: data.transactionNumber || Date.now().toString(),
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Payment initiation failed");
  //     }

  //     const { paymentUrl } = await response.json();
  //     window.location.href = paymentUrl;
  //   } catch (error) {
  //     console.error("Payment error:", error);
  //     throw error;
  //   }
  // };

  const createTransactionData = async (id: string | string[]) => {
    try {
      const response = await fetch(`${apiUrl}/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: insertTransactionData.amount,
          description: insertTransactionData.description,
          donationId: id,
          userName: insertTransactionData.userName,
        }),
      });
      // if (!response.ok) {
      //   throw new Error("Payment initiation failed");
      // }

      const { paymentUrl } = await response.json();
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment error:", error);
      throw error;
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
  }, []);
  // console.log("Singlepost", oneDonationPost);

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
        createTransactionData,
        insertTransactionData,
        setInsertTransactionData,
        loading: false,
      }}>
      {children}
    </DonationContext.Provider>
  );
};
