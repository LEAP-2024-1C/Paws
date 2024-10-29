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
  adoptionPost: {
    title: "",
    description: "",
    location: "",
    status: "",
  },
  token: "",
  setAdoptionPost: () => {},
  setToken: () => {},
  fetchAdoptionData: () => {},
  refetch: false,
  setRefetch: () => {},
});

export const UserProvider = ({ children }: AdoptionProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const [token, setToken] = useState<string>("");
  const [adoptionPost, setAdoptionPost] = useState<IAdoptionReq | null>(null);

  // const router = useRouter();

  const fetchAdoptionData = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.get(`${apiUrl}/api/v1/adoption`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const { createPost } = response.data;
        // console.log("USERrr", response.data);
        setAdoptionPost(createPost);
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchAdoptionData();
  }, []);

  // console.log("USER", user);

  return (
    <AdoptionContext.Provider
      value={{
        adoptionPost,
        setAdoptionPost,
        token,
        setToken,
        fetchAdoptionData,
        refetch,
        setRefetch,
        // count,
        // setCount,
        // add,
        // minus,
      }}
    >
      {children}
    </AdoptionContext.Provider>
  );
};
