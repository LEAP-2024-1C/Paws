"use client";
import React, { useContext, useState } from "react";
import Sidebar from "./components/sidebar";
import ProductList from "./components/productlist";
import { FiSearch, FiShoppingCart, FiHeart } from "react-icons/fi";
import { ShoppingContext } from "@/components/context/shopping_context";
import Link from "next/link";
import { CartContext } from "@/components/context/cart_context";
import { WishListContext } from "@/components/context/wishlist_context";
const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("latest");
  const { categories } = useContext(ShoppingContext);
  const { cartData } = useContext(CartContext);
  const { wishListData } = useContext(WishListContext);

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
          <div className="relative w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 
                focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent
                shadow-sm transition-all duration-200"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex gap-4 justify-end">
            <div className="relative group">
              <Link href="/shop/cart">
                <button
                  className="p-2.5 hover:bg-gray-100 rounded-lg relative transition-all duration-200 
                  group-hover:shadow-md flex items-center gap-2"
                >
                  <FiShoppingCart className="text-2xl text-gray-700" />
                  <span className="hidden sm:inline text-sm text-gray-600">
                    Cart
                  </span>
                  <span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full 
                    w-5 h-5 text-xs flex items-center justify-center shadow-sm 
                    transform transition-transform group-hover:scale-110"
                  >
                    {cartData.products.length}
                  </span>
                </button>
              </Link>
            </div>

            <div className="relative group">
              <Link href="/wishlist">
                <button
                  className="p-2.5 hover:bg-gray-100 rounded-lg relative transition-all duration-200 
                  group-hover:shadow-md flex items-center gap-2"
                >
                  <FiHeart className="text-2xl text-gray-700" />
                  <span className="hidden sm:inline text-sm text-gray-600">
                    Wishlist
                  </span>
                  <span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full 
                    w-5 h-5 text-xs flex items-center justify-center shadow-sm 
                    transform transition-transform group-hover:scale-110"
                  >
                    {wishListData.products.length}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
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
