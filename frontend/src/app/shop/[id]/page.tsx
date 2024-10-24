"use client";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import RelatedItems from "../components/relateditems";
import { useShoppingContext } from "@/components/context/shopping_context";

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

const ProductDetail: React.FC = () => {
  const params = useParams();
  const id = params.id;
  const [product, setProduct] = React.useState<Product | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [quantity, setQuantity] = React.useState(1);
  const { addToWishlist, addToCart, wishlist } = useShoppingContext();

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

  const handleAddToWishlist = () => {
    if (product) {
      addToWishlist(product);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const isInWishlist = product
    ? wishlist.some((item) => item.id === product.id)
    : false;

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
            <button
              onClick={handleAddToWishlist}
              className={`border p-2 rounded-md ${
                isInWishlist ? "bg-red-100" : "hover:bg-gray-100"
              }`}
            >
              <FaHeart
                className={isInWishlist ? "text-red-500" : "text-gray-500"}
              />
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
      <RelatedItems products={mockProducts} />
    </div>
  );
};

export default ProductDetail;
