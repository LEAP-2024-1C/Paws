"use client";
import React, { createContext, useEffect, useState } from "react";
import { IUser, UserContextType } from "@/interface";
import { apiUrl } from "@/utils/util";
import axios from "axios";
// import { useRouter } from "next/navigation";

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType>({
  user: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    rePassword: "",
  },
  token: "",
  setUser: () => {},
  setToken: () => {},
  fetchUserData: () => {},
  refetch: false,
  setRefetch: () => {},
  // count: 0,
  // setCount: () => {},
  // minus: () => {},
  // add: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [refetch, setRefetch] = useState(false);
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<IUser | null>(null);

  // const router = useRouter();

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      const response = await axios.get(`${apiUrl}/api/v1/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        const { user } = response.data;
        // console.log("USERrr", response.data);
        setUser(user);
        setRefetch(!refetch);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // console.log("USER", user);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        fetchUserData,
        refetch,
        setRefetch,
        // count,
        // setCount,
        // add,
        // minus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
