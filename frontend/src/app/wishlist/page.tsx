"use client";
import React, { useContext, useEffect } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { WishListContext } from "@/components/context/wishlist_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface WishlistItem {
  product: Product;
}

const WishlistPage: React.FC = () => {
  const { wishListData, removeFromWishList } = useContext(WishListContext);

  const handleAddToCart = async (productId: string) => {
    try {
      console.log("Adding to cart:", productId);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart.");
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishList(productId);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing from wishlist.");
    }
  };

  useEffect(() => {
    console.log(wishListData);
  }, [wishListData]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
        <div className="grid grid-cols-1 gap-4">
          {/* Render each item in the wishlist */}
          {wishListData?.products?.map((item: WishlistItem) => (
            <div
              key={item.product._id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-20 h-20 object-cover rounded"
                  src={item.product.images[0]}
                  alt={item.product.name}
                />

                <div>
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-orange-500">${item.product.price}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  title="Add to Cart"
                  onClick={() => handleAddToCart(item.product._id)}
                >
                  <FiShoppingCart className="text-xl" />
                </button>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full text-red-500"
                  title="Remove from Wishlist"
                  onClick={() => handleRemoveFromWishlist(item.product._id)}
                >
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default WishlistPage;
