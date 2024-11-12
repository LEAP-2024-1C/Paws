"use client";

import React, { useContext, useEffect, useState } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { WishListContext } from "@/components/context/wishlist_context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  description?: string;
  quantity: number;
  discount?: number;
}

interface WishlistItem {
  product: Product;
}

const WishlistPage: React.FC = () => {
  const { wishListData, removeFromWishList } = useContext(WishListContext);
  const [loading, setLoading] = useState(false);
  const [error] = useState<string | null>(null);

  const handleAddToCart = async (productId: string) => {
    try {
      setLoading(true);
      console.log("Adding to cart:", productId);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Error adding to cart.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      setLoading(true);
      await removeFromWishList(productId);
      toast.success("Removed from wishlist successfully!");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Error removing from wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wishListData) {
      console.log("Wishlist data:", wishListData);
    }
  }, [wishListData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>
        {wishListData?.products?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {wishListData.products.map((item: WishlistItem) => (
              <div
                key={item.product?._id}
                className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    className="w-20 h-20 object-cover rounded"
                    src={
                      item.product?.images[0] ||
                      "https://via.placeholder.com/150"
                    }
                    alt={item.product?.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150";
                    }}
                  />
                  <div>
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-orange-500">
                      ${item.product?.price.toFixed(2)}
                    </p>
                    {item.product?.discount && (
                      <p className="text-red-500 text-sm">
                        Discount: {item.product?.discount}%
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    title="Add to Cart"
                    onClick={() => handleAddToCart(item.product?._id)}
                    disabled={loading}
                  >
                    <FiShoppingCart className="text-xl" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full text-red-500"
                    title="Remove from Wishlist"
                    onClick={() => handleRemoveFromWishlist(item.product?._id)}
                    disabled={loading}
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center mt-8">
            <p>Your wishlist is empty.</p>
          </div>
        )}
      </main>
      <ToastContainer />
    </div>
  );
};

export default WishlistPage;
