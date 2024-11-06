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
  size: string;
  quantity: number;
}
type Size = "S" | "M" | "L";

interface ShoppingContextType {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  loading: boolean;
  categories: Category[];
  cartItems: Product[];
  insertCartData: (id: string) => void;
  selectedSize: Size | null;
  setSelectedSize: (size: Size) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const ShoppingContext = createContext<ShoppingContextType>({
  product: {
    _id: "",
    name: "",
    price: 0,
    description: "",
    images: [],
    category: "",
    quantity: 0,
    size: "",
  },
  setProduct: () => {},
  loading: false,
  categories: [],
  cartItems: [],
  insertCartData: () => {},
  selectedSize: null,
  setSelectedSize: () => {},
  quantity: 1,
  setQuantity: () => {},
});

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [product, setProduct] = React.useState<Product>({
    _id: "",
    name: "",
    price: 0,
    description: "",
    images: [],
    category: "",
    quantity: 0,
    size: "",
  });
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<Size | null>(null);

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
  const getCartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${apiUrl}/api/v1/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response", res);

      if (res.status === 200) {
        const cartItems = res.data.cartData;
        console.log("CART ITEMS", cartItems);
        setCartItems(cartItems);
      }
    } catch (error) {
      console.log("Failed to get cart data", error);
    }
  };
  const insertCartData = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${apiUrl}/api/v1/cart/insert`,
        {
          productId: id,
          quantity: quantity,
          size: selectedSize,
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
      console.log("Can't insert product to Cart", error);
      toast.error("Failed to add cart");
    }
  };

  useEffect(() => {
    fetchAllProducts();
    getCategoriesData();
    getCartData();
  }, []);

  return (
    <ShoppingContext.Provider
      value={{
        loading,
        categories,
        cartItems,
        insertCartData,
        product,
        setProduct: setProduct,
        quantity: quantity,
        setQuantity: setQuantity,
        selectedSize: selectedSize,
        setSelectedSize: setSelectedSize,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
