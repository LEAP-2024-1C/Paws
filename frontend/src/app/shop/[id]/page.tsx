"use client";
import React from "react";
import { useParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Pet Carriers",
    price: 29.99,
    description: "Pet Carriers   ",
    image: "../img/pet-carrier.jpg",
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
];

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (id) {
      // Simulate API call with setTimeout
      setTimeout(() => {
        const foundProduct = mockProducts.find((p) => p.id === Number(id));
        setProduct(foundProduct || null);
        setLoading(false);
      }, 500); // 500ms delay to simulate network request
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <div className="bg-gray-200 w-full aspect-video rounded-lg mb-4">
        {product.image}
      </div>
      <p className="text-2xl font-bold mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-800 transition-colors">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;
