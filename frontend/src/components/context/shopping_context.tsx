import React, { createContext, useContext, useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShoppingContextType {
  wishlist: Product[];
  cart: CartItem[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    console.log("Loading wishlist from localStorage:", savedWishlist);
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    console.log("Saving wishlist to localStorage:", wishlist);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      const newWishlist = [...prev, product];
      console.log("Adding to wishlist:", newWishlist);
      return newWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => {
      const newWishlist = prev.filter((item) => item.id !== productId);
      console.log("Removing from wishlist:", newWishlist);
      return newWishlist;
    });
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartItemQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  return (
    <ShoppingContext.Provider
      value={{
        wishlist,
        cart,
        addToWishlist,
        removeFromWishlist,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShoppingContext = () => {
  const context = useContext(ShoppingContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingContext must be used within a ShoppingProvider"
    );
  }
  return context;
};
