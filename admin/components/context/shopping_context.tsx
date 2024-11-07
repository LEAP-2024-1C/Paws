'use client';

import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext
} from 'react';
import axios from 'axios';
import { apiUrl } from '@/utils/util';
import { toast } from 'react-toastify';
import { PetsContext } from './pets-context';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: {
    name: string;
  };
  quantity: number;
  size: string;
}
interface ShoppingContextType {
  product: Product[];
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  loading: boolean;
  wishlistItems: Product[];
  filteredProducts: Product[];
  getFilteredProducts: (id: string[]) => void;
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  searchValue: string;
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
}

export const ShoppingContext = createContext<ShoppingContextType>({
  product: [],
  setProduct: () => {},
  loading: false,
  wishlistItems: [],
  filteredProducts: [],
  getFilteredProducts: () => {},
  selectedCategory: [],
  setSelectedCategory: () => {},
  searchValue: '',
  wishlistCount: 0,
  toggleWishlist: () => {}
});

export const ShoppingProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const { refetch, setRefetch } = useContext(PetsContext);

  const getFilteredProducts = (id: string[]) => {
    const filtered = product.filter((item) => id.includes(item.category.name));
    setFilteredProducts(filtered);
  };

  const toggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/v1/products`);
      if (res.status === 200) {
        setProduct(res.data.product);
        setRefetch?.(!refetch);
      }
    } catch (error) {
      console.log("Can't fetch products", error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllProducts();
  }, [refetch]);
  return (
    <ShoppingContext.Provider
      value={{
        product,
        setProduct,
        loading,
        wishlistItems,
        filteredProducts,
        getFilteredProducts,
        selectedCategory,
        setSelectedCategory,
        searchValue,
        wishlistCount: wishlistItems.length,
        toggleWishlist
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};
