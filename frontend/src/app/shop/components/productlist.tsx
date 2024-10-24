import React, { useState } from "react";
import ProductCard from "./productcard";
import Pagination from "./pagination";

interface ProductList {
  selectedCategory: string;
  searchTerm: string;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const ProductList: React.FC<ProductList> = ({
  selectedCategory,
  searchTerm,
  sortOrder,
  setSortOrder,
}) => {
  const [currentPage] = useState(1);
  const productsPerPage = 12;

  // (бодит дата авах үед солино)
  const products = [
    {
      id: 1,
      name: "Pet Carrier",
      price: 29.99,
      category: "Pet Accessories",
      image: "/img/pet-carrier.jpg",
    },
    {
      id: 2,
      name: "Cat Bowl",
      price: 20.99,
      category: "Pet Accessories",
      image: "/img/cat-bowl.jpg",
    },
    {
      id: 3,
      name: "Cat Bowl",
      price: 19.99,
      category: "Pet Accessories",
      image: "/img/cat-bowl.jpg",
    },
    {
      id: 4,
      name: "Premium Cat Food",
      price: 20.99,
      category: "Pet Food",
      image: "/img/cat-food.jpg",
    },
    {
      id: 5,
      name: "Dog Bowl",
      price: 4.99,
      category: "Pet Accessories",
      image: "/img/dog-bowl.jpg",
    },
    {
      id: 6,
      name: "Cat Bed",
      price: 49.99,
      category: "Pet Accessories",
      image: "/img/cat-bed.jpg",
    },
    {
      id: 7,
      name: "Dog Leash",
      price: 9.99,
      category: "Pet Accessories",
      image: "/img/dog-leash.jpg",
    },
    {
      id: 8,
      name: "Dog Bed",
      price: 49.99,
      category: "Pet Accessories",
      image: "/img/dog-bed.jpg",
    },
    {
      id: 9,
      name: "Cat Bowl",
      price: 20.99,
      category: "Pet Accessories",
      image: "/img/cat-bowl.jpg",
    },
    {
      id: 10,
      name: "Premium Dog Food",
      price: 29.99,
      category: "Pet Food",
      image: "/img/dog-food.jpg",
    },
    {
      id: 11,
      name: "Dog Bowl",
      price: 19.99,
      category: "Pet Accessories",
      image: "/img/dog-bowl.jpg",
    },
    {
      id: 12,
      name: "Premium Dog Food",
      price: 24.99,
      category: "Pet Food",
      image: "/img/dog-food.jpg",
    },
  ];

  const filteredProducts = products
    .filter((product) =>
      selectedCategory === "All" ? true : product.category === selectedCategory
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "price_asc") return a.price - b.price;
      if (sortOrder === "price_desc") return b.price - a.price;
      return 0;
    });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="w-full md:w-3/4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="latest">Latest</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
      />
    </div>
  );
};

export default ProductList;
