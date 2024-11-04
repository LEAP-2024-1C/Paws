"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  quantity: number;
  size: string;
}

interface Category {
  _id: string;
  name: string;
  count: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingContextType {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  categories: Category[];
  cartItems: CartItem[];
  wishlistItems: Product[];
}

export const ShoppingContext = createContext<ShoppingContextType>({
  product: [],
  setProduct: () => {},
  loading: false,
  categories: [],
  cartItems: [],
  wishlistItems: [],
});

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/v1/products`);
      if (res.status === 200) {
        setProduct(res.data.product);
        console.log("PRODUCTS", res.data.product);
      }
    } catch (error) {
      console.log("Can't fetch products", error);
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const getCategoriesData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/products/categories`);
      if (res.status === 200) {
        setCategories(res.data.categories);
      }
    } catch (error) {
      console.log("Can't fetch categories", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchAllProducts();
    getCategoriesData();
  }, []);

  return (
    <ShoppingContext.Provider
      value={{
        product,
        setProduct,
        loading,
        categories,
        cartItems,
        wishlistItems,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
