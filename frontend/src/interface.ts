export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rePassword: string;
}

export interface UserContextType {
  user: IUser | null;
  token: string;
  setToken: (token: string) => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  fetchUserData?: () => void;
  refetch?: boolean;
  setRefetch?: (refetch: boolean) => void;
  // count: number;
  // setCount: (count: number) => void;
  // minus: () => void;
  // add: () => void;
}

export interface ProfileContextType {
  isLoading: boolean;
  enterEmail: string;
  step: number;
  countDown: number;
  otpValue: string;
  setIsLoading: (isLoading: boolean) => void;
  setEnterEmail: (enterEmail: string) => void;
  setStep: (step: number) => void;
  setCountDown: (countDown: number) => void;
  setOtpValue: (otpValue: string) => void;
  handleEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSend: () => Promise<void>;
  handleConfirmOtp: (otpValue: string) => Promise<void>;
  handleResendOtp: () => void;
}

export interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  images: [string];
  isNew: boolean;
  quantity: number;
  discount: number;
  category: string;
  comment?: [
    {
      name: string;
      rating: number;
      comment: string;
    }
  ];
}

export interface IOneProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  images: string[];
  isNew: boolean;
  quantity: number;
  discount: number;
  category: string;
  comment: {
    name: string;
    rating: number;
    comment: string;
  }[];
}

export interface ProductContextType {
  product: IProduct[];
  setProduct: (product: IProduct[]) => void;
  fetchAllProducts: () => void;
  rating: number;
  setRating: (rating: number) => void;
  comment: string;
  setComment: (comment: string) => void;
  newComment: (id: string | string[]) => void;
  oneProduct: IOneProduct;
  // setOneProduct: (oneProduct: IOneProduct) => {};
  fetchProductData: (id: string | string[]) => void;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
}

export interface CategoryContextType {
  category: ICategory[];
  fetchCategoryData: () => void;
  getFilteredProducts: (id: string[]) => void;
  filteredProducts: IProduct[];
  setFilteredProducts: (filteredProducts: IProduct[]) => void;
  selectedCat: string[];
  setSelectedCat: (selectedCat: string[]) => void;
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
  selectedSize: string | null;
  setSelectedSize: (selectedSize: string | null) => void;
}

export type CardProps = {
  name: string;
  price: number;
  _id: string;
  discount: number;
  images: string[];
};

export type WishListProps = {
  name: string;
  price: number;
  _id: string;
  images: string[];
};

export interface ISizeLists {
  size: string;
  id: string;
}

export interface ICart {
  products: [
    {
      product: {
        name: string;
        category: string;
        comment: [];
        description: string;
        discount: 0;
        images: [];
        isNew: true;
        price: 0;
        quantity: 0;
        size: string;
        _id: string;
      };
      quantity: number;
      totalAmount: number;
      size: ISizeLists;
    }
  ];
  totalAmount: number;
  productId: string | string[];
}

export interface IInsertData {
  productId: string | string[];
  quantity: number;
  totalAmount: number | number[];
}

export interface CartContextType {
  // cartData: ICart[];
  cartData: ICart;
  setCartData: (cartData: ICart) => void;
  postCartData: () => void;
  count: number;
  setCount: (count: number) => void;
  minus: () => void;
  add: () => void;
  getcartData: () => void;
  deleteProduct: (productId: string) => Promise<void>;
  refetch: boolean;
  setRefetch: (refetch: boolean) => void;
  addCount: (_id: string) => void;
  reduceCount: (_id: string) => void;
  productSize: ISizeLists;
  setProductSize: (productSize: ISizeLists) => void;
  sizeList: ISizeLists[];
  updateCartData: (productId: string, newQuantity: number) => Promise<void>;
  // insertCartData: IInsertData;
}

export interface IWishList {
  products: [
    {
      product: {
        name: string;
        category: string;
        comment: [];
        description: string;
        discount: 0;
        images: [];
        isNew: true;
        price: 0;
        quantity: 0;
        size: string;
        _id: string;
      };
    }
  ];
  productId: string | string[];
}

export interface WishListContextType {
  wishListData: IWishList;
  setWishListData: (wishListData: IWishList) => void;
  getWishListData: () => void;
  addToWishList: (id: string) => void;
  deleteList: (productId: string) => void;
}
