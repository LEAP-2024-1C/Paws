"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { apiUrl } from "@/utils/util";
import axios from "axios";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
}

type Size = "S" | "M" | "L";

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [quantity, setQuantity] = React.useState(1);
  const [selectedSize, setSelectedSize] = React.useState<Size | null>(null);
  const [isInWishlist, setIsInWishlist] = React.useState(false);
  const [activeImage, setActiveImage] = React.useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/v1/products/${id}`);
        setProduct(response.data.product);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to load product");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
      alert("Please select a size before adding to cart");
      return;
    }

    // Add your cart logic here
    const cartItem = {
      productId: product._id,
      quantity,
      size: selectedSize,
      price: product.price,
      name: product.name,
      image: product.images[0],
    };

    console.log("Adding to cart:", cartItem);
    // Implement your cart state management here
  };

  const handleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    // Add your wishlist logic here
    console.log("Toggling wishlist for product:", product?._id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Product not found
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div>
          <div className="bg-gray-50 rounded-xl p-8 mb-4 shadow-sm">
            <Image
              src={
                product.images[activeImage]?.startsWith("http")
                  ? product.images[activeImage]
                  : `/${product.images[activeImage]}`
              }
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg transition-transform hover:scale-105"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`border-2 rounded-lg overflow-hidden ${
                  activeImage === index
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image.startsWith("http") ? image : `/${image}`}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-auto object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                In Stock
              </span>
              <p className="text-gray-500 text-sm">SKU: {product._id}</p>
            </div>
          </div>

          {/* Price with sale badge if needed */}
          <div className="border-b pb-6 flex items-center gap-4">
            <p className="text-3xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </p>
            {product.price < 100 && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Special Offer
              </span>
            )}

            <div className="flex gap-4 ml-auto">
              <button className="p-2.5 hover:bg-gray-200 rounded-lg relative transition-colors duration-200">
                <FiShoppingCart className="text-2xl text-gray-700" />
                <Link href="/shop_cart">
                  <span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full 
                    w-5 h-5 text-xs flex items-center justify-center shadow-sm 
                    transform transition-transform hover:scale-110"
                  ></span>
                </Link>
              </button>
              <button className="p-2.5 hover:bg-gray-200 rounded-lg relative transition-colors duration-200">
                <Link href="/wishlist" className="flex items-center">
                  <FiHeart className="text-2xl text-gray-700" />
                  <span
                    className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full 
                    w-5 h-5 text-xs flex items-center justify-center shadow-sm 
                    transform transition-transform hover:scale-110"
                  ></span>
                </Link>
              </button>
            </div>
          </div>

          {/* Size Selection with better feedback */}
          <div>
            <div className="flex justify-between mb-3">
              <p className="font-medium text-gray-900">Select Size</p>
              {!selectedSize && (
                <p className="text-red-500 text-sm">Please select a size</p>
              )}
            </div>
            <div className="flex gap-3">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className={`w-14 h-14 rounded-lg font-medium transition-all duration-200 
                    ${
                      selectedSize === size
                        ? "bg-orange-500 text-white ring-2 ring-orange-500 ring-offset-2"
                        : "bg-gray-50 text-gray-900 hover:bg-gray-100 hover:shadow-md"
                    }`}
                  onClick={() => setSelectedSize(size as Size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Add to Cart with improved feedback */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg font-medium"
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-16 text-center bg-transparent"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-3 hover:bg-gray-100 transition-colors text-lg font-medium"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-orange-500 text-white px-8 py-3 rounded-lg font-medium 
                hover:bg-orange-600 transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              Add to Cart
            </button>
          </div>

          <button
            onClick={handleWishlist}
            className={`p-3 rounded-lg transition-all duration-300 ${
              isInWishlist
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-gray-50 text-gray-400 hover:bg-gray-100"
            }`}
            aria-label="Add to wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill={isInWishlist ? "currentColor" : "none"}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>

          {/* Description */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Additional Information
            </h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">
            No reviews yet. Be the first to review this product.
          </p>
        </div>
      </div>

      {/* Shipping Section */}
      <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Shipping Information
        </h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="text-gray-600">
            Free shipping on orders over $50. Estimated delivery time: 3-5
            business days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
