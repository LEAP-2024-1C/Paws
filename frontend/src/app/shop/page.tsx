"use client";
import React, { useContext, useState } from "react";
import Sidebar from "./components/sidebar";
import ProductList from "./components/productlist";
import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";
import { ShoppingContext } from "@/components/context/shopping_context";
import Link from "next/link";
import { toast } from "react-toastify";

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const { categories } = useContext(ShoppingContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex gap-4 ml-4">
            <button className="p-2 hover:bg-gray-200 rounded-full relative">
              <FiShoppingCart className="text-2xl" />
              <Link href="/shop_cart">
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"></span>
              </Link>
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full relative">
              <Link href="/wishlist">
                <FiHeart className="text-2xl" />
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"></span>
              </Link>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
          <ProductList
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
      </main>
    </div>
  );
};

export default ShopPage;
