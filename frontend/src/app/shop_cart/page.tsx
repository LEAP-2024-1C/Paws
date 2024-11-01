"use client";
import React, { useContext } from "react";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import { ShoppingContext } from "@/components/context/shopping_context";

const CartPage: React.FC = () => {
  const { cartItems } = useContext(ShoppingContext);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">Shopping Cart</h1>

        {cartItems?.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded-lg shadow mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-orange-500">${item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {}}
                          className="p-1 hover:bg-gray-100 rounded-full"
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => {}}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <FiPlus />
                        </button>
                      </div>
                      <button className="p-2 hover:bg-gray-100 rounded-full text-red-500">
                        <FiTrash2 className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
