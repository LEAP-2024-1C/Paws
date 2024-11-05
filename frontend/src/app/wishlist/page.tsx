"use client";
import React, { useContext } from "react";
import { FiTrash2, FiShoppingCart } from "react-icons/fi";
import { WishListContext } from "@/components/context/wishlist_context";

const WishlistPage: React.FC = () => {
  const { wishListData } = useContext(WishListContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

        {wishListData?.product?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {wishListData?.product?.map((item) => (
              <div
                key={item.product._id}
                className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
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
                  >
                    <FiShoppingCart className="text-xl" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full text-red-500"
                    title="Remove from Wishlist"
                  >
                    <FiTrash2 className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default WishlistPage;
