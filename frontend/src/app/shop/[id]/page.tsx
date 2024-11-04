"use client";
import React, { useContext, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingContext } from "@/components/context/shopping_context";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2"></div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-green-500 mb-4">Available</p>
          <p className="text-gray-600 mb-4">Code: {product.id}</p>

          <div className="mb-4">
            <p className="font-semibold mb-2">Size</p>
            <div className="flex gap-2">
              {["S", "M", "L"].map((size) => (
                <button
                  key={size}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <p className="font-semibold mb-2">Type</p>
            <select className="w-full p-2 border rounded-md">
              <option>Select the type</option>
            </select>
          </div>

          <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border rounded-md">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-12 text-center"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-orange-500 text-white px-6 py-1.5 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Add to Cart
            </button>
          </div>
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="border-t pt-4">
            <h2 className="font-semibold mb-2">Additional information</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t pt-4">
        <h2 className="font-semibold mb-2">Reviews</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <div className="border-t pt-4">
        <h2 className="font-semibold mb-2">Shipping</h2>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
