import React, { useContext, useState } from "react";
import ProductCard from "./productcard";
import Pagination from "./pagination";
import { ShoppingContext } from "../../../components/context/shopping_context";

interface ProductListProps {
  selectedCategory: string;
  searchTerm: string;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  selectedCategory,
  searchTerm,
  sortOrder,
  setSortOrder,
}) => {
  const [currentPage] = useState(1);
  const productsPerPage = 12;

  const { product, loading } = useContext(ShoppingContext);

  if (loading) {
    return (
      <div className="w-full md:w-3/4 p-4 flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  const filteredProducts = product
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

  if (!loading && (!product || product.length === 0)) {
    return (
      <div className="w-full md:w-3/4 p-4 flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">No products available.</p>
      </div>
    );
  }

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
          <ProductCard key={product._id} product={product} />
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
