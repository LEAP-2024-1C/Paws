import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductCard {
  product: Product;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 flex flex-col">
      <div className="bg-gray-300 w-full aspect-square rounded-lg mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
      <div className="flex justify-between items-center">
        <p className="text-lg font-thin">${product.price.toFixed(2)}</p>
        <button className="text-orange-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
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
