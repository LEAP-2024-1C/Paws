"use client";
import React, { createContext, useEffect, useState } from "react";
import { CartContextType, ICart, ISizeLists } from "@/interface";
import { useParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext<CartContextType>({
  cartData: {
    products: [
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
        quantity: 1,
        totalAmount: 0,
        size: {} as ISizeLists,
      },
    ],
    totalAmount: 0,
    productId: "",
  },
  setCartData: () => {},
  getcartData: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  postCartData: () => {},
  count: 0,
  setCount: () => {},
  minus: () => {},
  plus: () => {},
  add: () => {},
  deleteProduct: () => Promise.resolve(),
  refetch: false,
  setRefetch: () => {},
  selectedSize: {} as ISizeLists,
  setSelectedSize: () => {},
  addCount: () => {},
  reduceCount: () => {},
  productSize: {} as ISizeLists,
  setProductSize: () => {},
  sizeList: [] as ISizeLists[],
  updateCartData: () => Promise.resolve(),
});

export const CartProvider = ({ children }: CartProviderProps) => {
  const { id } = useParams();
  const [cartData, setCartData] = useState<ICart>({
    products: [
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
        quantity: 1,
        totalAmount: 0,
        size: {} as ISizeLists,
      },
    ],
    totalAmount: 0,
    productId: id as string,
  });

  const getcartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/api/v1/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const carts = res.data.cartData;
        setCartData(carts);
      }
    } catch (error) {
      console.log("Failed to get cart data", error);
    }
  };

  const addToCart = async (id: string, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiUrl}/api/v1/cart/add`,
        {
          productId: id,
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        toast.success("Added to cart successfully");
        getcartData();
      }
    } catch (error) {
      console.log("cant fetch cart", error);
      toast.error("Failed to add to cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${apiUrl}/api/v1/cart/delete`, {
        data: {
          productId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        toast.warning("Removed from cart");
        getcartData();
      }
    } catch (error) {
      console.log("Failed to delete cart item", error);
      toast.error("Couldn't remove from cart");
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${apiUrl}/api/v1/cart/update`,
        {
          productId,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        getcartData();
      }
    } catch (error) {
      console.log("Failed to update quantity", error);
      toast.error("Couldn't update quantity");
    }
  };

  useEffect(() => {
    getcartData();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartData,
        setCartData,
        getcartData,
        addToCart,
        removeFromCart,
        updateQuantity,
        postCartData: () => {},
        count: 0,
        setCount: () => {},
        minus: () => {},
        plus: () => {},
        add: () => {},
        deleteProduct: () => Promise.resolve(),
        refetch: false,
        setRefetch: () => {},
        selectedSize: {} as ISizeLists,
        setSelectedSize: () => {},
        addCount: () => {},
        reduceCount: () => {},
        productSize: {} as ISizeLists,
        setProductSize: () => {},
        sizeList: [] as ISizeLists[],
        updateCartData: () => Promise.resolve(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
