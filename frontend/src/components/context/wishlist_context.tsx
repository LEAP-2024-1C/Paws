"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { WishListContextType, IWishList } from "@/interface";
import { useParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { ShoppingContext } from "./shopping_context";
type WishListProviderProps = {
  children: React.ReactNode;
};

export const WishListContext = createContext<WishListContextType>({
  wishListData: {
    product: [
      {
        product: {
          name: "",
          category: "",
          comment: [],
          description: "",
          discount: 0,
          images: [],
          isNew: true,
          price: 0,
          quantity: 0,
          size: "",
          _id: "",
        },
      },
    ],
    productId: "",
  },
  setWishListData: (wishListData: IWishList) => {},
  getWishListData: () => {},
  addToWishList: (id: string) => {},
  deleteList: (productId: string) => {},
});

export const WishListProvider = ({ children }: WishListProviderProps) => {
  const { id } = useParams();
  const { product } = useContext(ShoppingContext);
  const [wishListData, setWishListData] = useState<IWishList>({
    product: [
      {
        product: {
          name: "",
          category: "",
          comment: [],
          description: "",
          discount: 0,
          images: [],
          isNew: true,
          price: 0,
          quantity: 0,
          size: "",
          _id: "",
        },
      },
    ],
    productId: id as string,
  });

  const getWishListData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/api/v1/wishlist/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        let wishlists = res.data.wishListData;
        console.log("WISHLISTS", wishlists);
        setWishListData(wishlists);
      }
    } catch (error) {
      console.log("Failed to get cart data", error);
    }
  };

  const addToWishList = async (id: string) => {
    try {
      const postingProduct = product.find((cur) => cur._id === id);
      console.log("PCID", postingProduct);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiUrl}/api/v1/wishlist/add`,
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Added to wishlist successfully");
      }
    } catch (error) {
      console.log("cant fetch wishlists", error);
      toast.error("Failed to post wishlist");
    }
  };

  const deleteList = async (productId: string) => {
    console.log("productId", productId);
    try {
      // const id = i.product._id;
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${apiUrl}/api/v1/wishlist/delete`, {
        data: {
          productId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        console.log("Delete", res.data.updatedCart);
        toast.warning("Deleted product from wishlist");
      }
    } catch (error) {
      console.log("Failed to delete cart data", error);
      toast.error("Couldn't delete from wishlist");
    }
  };

  return (
    <WishListContext.Provider
      value={{
        wishListData,
        setWishListData,
        getWishListData,
        addToWishList,
        deleteList,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
