"use client";
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import ProductList from "./components/productlist";
import { FiSearch } from "react-icons/fi";

const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");

  const categoriesData = [
    { name: "All", count: 255 },
    { name: "Furniture", count: 21 },
    { name: "Bowls", count: 28 },
    { name: "Clothing", count: 12 },
    { name: "Food", count: 80 },
    { name: "Toys", count: 90 },
    { name: "Sale", count: 24 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-center">
          <div className="relative w-full max-w-xl">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <Sidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categoriesData}
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
