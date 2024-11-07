"use client";

import React, { useContext, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "@/components/context/cart_context";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  images: string[];
}

interface CartItem {
  product: Product;
  quantity: number;
}

const CheckoutForm: React.FC = () => {
  const { cartData } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartData.products,
          amount: cartData.products.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed.");
      } else if (result.paymentIntent?.status === "succeeded") {
        toast.success("Payment successful!");
      }
    } catch (error) {
      toast.error("Payment error.");
      console.error("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded-xl">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
        className="p-3 border rounded-lg mb-6"
      />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : `Pay $${cartData.products
              .reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
              )
              .toFixed(2)}`}
      </button>
    </form>
  );
};

const CartPage: React.FC = () => {
  const { cartData, removeFromCart } = useContext(CartContext);

  const totalAmount = cartData.products.reduce(
    (total, item: CartItem) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

        {cartData.products.length > 0 ? (
          <div className="space-y-4">
            {cartData.products.map((item: CartItem) => (
              <div
                key={item.product._id}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <img
                    className="w-24 h-24 object-cover rounded-lg"
                    src={item.product.images[0]}
                    alt={item.product.name}
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {item.product.name}
                    </h3>
                    <p className="text-orange-500 font-medium text-lg">
                      ${item.product.price.toFixed(2)}
                    </p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-red-50 rounded-full text-red-500 transition-colors duration-200"
                  onClick={() => removeFromCart(item.product._id)}
                  aria-label="Remove item"
                >
                  <FiTrash2 className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        )}

        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 text-gray-800 border-b pb-4">
            Total: ${totalAmount.toFixed(2)}
          </h2>

          {/* Stripe Payment Section */}
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </main>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default CartPage;
