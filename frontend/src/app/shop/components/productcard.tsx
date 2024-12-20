import React, { useContext, useState } from "react";
import Link from "next/link";
import { WishListContext } from "@/components/context/wishlist_context";
import { toast } from "react-toastify";

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface ProductCard {
  product: Product;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const { addToWishList, removeFromWishList } = useContext(WishListContext);

  const [loved, setLoved] = useState(false);

  const wishlist = async () => {
    try {
      if (!loved) {
        await addToWishList(product._id);
        setLoved(true);
      } else {
        await removeFromWishList(product._id);
        setLoved(false);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("e");
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col">

      <Link href={`/shop/${product?._id}`}>
        <div className="bg-gray-300 w-full aspect-square rounded-xl mb-4 h-80 overflow-hidden">
          <img src={product.images[0]} alt={product.name} />

        </div>
      </Link>
      <Link href={`/shop/${product?._id}`}>
        <h3 className="text-xl font-bold mb-2">{product?.name}</h3>
      </Link>
      <div className="flex justify-between items-center">
        <p className="text-lg font-thin">${product?.price.toFixed(2)}</p>
        <button onClick={wishlist} className="text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill={loved ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
