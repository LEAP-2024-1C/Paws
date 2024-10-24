"use client";
import React, { useEffect, useState } from "react";
import { useShoppingContext } from "@/components/context/shopping_context";

// Mock data type
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pet Carriers",
    price: 29.99,
    description: "Pet Carriers   ",
    image: "/img/pet-carrier.jpg",
  },
  {
    id: 2,
    name: "Pet Collars",
    price: 599.99,
    description: "Pet Collars ",
    image: "/img/pet-collar.jpg",
  },
  {
    id: 3,
    name: "Cat Bowls",
    price: 19.99,
    description: "Муурны хоолны сав",
    image: "/img/cat-bowl.jpg",
  },
  {
    id: 4,
    name: "Dog Collars",
    price: 19.99,
    description: "Dog Collars",
    image: "/img/dog-collar.jpg",
  },
  {
    id: 5,
    name: "Dog Beds",
    price: 19.99,
    description: "Dog Beds",
    image: "/img/dog-bed.jpg",
  },
  {
    id: 6,
    name: "Dog Beds",
    price: 19.99,
    description: "Dog Beds",
    image: "/img/dog-bed.jpg",
  },
  {
    id: 7,
    name: "Dog Beds",
    price: 19.99,
    description: "Dog Beds",
    image: "/img/dog-bed.jpg",
  },
  {
    id: 8,
    name: "Dog Beds",
    price: 19.99,
    description: "Dog Beds",
    image: "/img/dog-bed.jpg",
  },
];

const WishlistPage: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>(mockProducts);
  const { removeFromWishlist } = useShoppingContext();

  useEffect(() => {
    console.log("Wishlist page mounted. Current wishlist:", wishlist);
  }, [wishlist]);

  const handleRemoveFromWishlist = (id: number) => {
    console.log("Removing product:", id);
    setWishlist(wishlist.filter((product) => product.id !== id));
    removeFromWishlist(id);
  };

  return (
    <div className="w-1/2 h-[calc(100vh-290px)] m-auto pt-16">
      <h1 className="text-xl font-bold mb-4">
        Хадгалсан бараа ({wishlist.length})
      </h1>
      {wishlist.map((product) => (
        <div key={product.id} className="mb-4 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-gray-600">{product.price}</p>
          <img src={product.image} alt={product.name} className="w-1/2 h-1/2" />
          <button
            onClick={() => handleRemoveFromWishlist(product.id)}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-red-600"
          >
            Remove from Wishlist
          </button>
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
