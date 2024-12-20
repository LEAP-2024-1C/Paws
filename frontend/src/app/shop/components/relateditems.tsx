import React from "react";
import Image from "next/image";
import Link from "next/link";

interface RelatedProduct {
  _id: string;
  name: string;
  price: number;
  image: string;
}

interface RelatedItems {
  fetchAllProducts: RelatedProduct[];
}

const RelatedItems: React.FC<RelatedItems> = ({ fetchAllProducts }) => {
  // products to 8 items
  const limitedProducts = fetchAllProducts.slice(0, 8);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Related Items</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {limitedProducts.map((product) => (
          <Link
            href={`/shop/${product._id}`}
            key={product._id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedItems;
