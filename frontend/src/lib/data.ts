export type Card = {
  id: number;
  name: string;
  image: string;
};

export interface IProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  quantity: number;
  size: string;
}

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};
export interface AppsType {
  id: number;
  name: string;
  image: string;
  url: string;
}
export const Cards: Card[] = [
  {
    id: 1,
    name: "Fluffy",
    image:
      "https://i.pinimg.com/736x/83/d4/f2/83d4f2a4da3cef91bbc4de211e7e6d0f.jpg",
  },
  {
    id: 2,
    name: "Spot",
    image:
      "https://i.pinimg.com/enabled/736x/ab/87/04/ab87043f15a845cd1608e3085d710ce4.jpg",
  },
  {
    id: 3,
    name: "Pet name",
    image:
      "https://i.pinimg.com/enabled/564x/61/2c/aa/612caa88fc7b7a9b3a0390dac6f9e77d.jpg",
  },
  {
    id: 4,
    name: "Pet name",
    image:
      "https://i.pinimg.com/enabled/736x/27/f5/b4/27f5b487911392cf1e73f83498107006.jpg",
  },
];

export const products: Product[] = [
  {
    id: "",
    name: "Cat Bowl",
    price: 35000,
    image: "/img/product.png",
  },
  {
    id: "",
    name: "Cat Bowl",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: "",
    name: "Dog Leash",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: "",
    name: "Premium Cat food",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: "",
    name: "Dog Bed",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: "",
    name: "Premium Dog Food",
    price: 120000,
    image: "/img/product.png",
  },
];

export const Apps: AppsType[] = [
  {
    id: 1,
    name: "Instagram",
    image:
      "https://i.pinimg.com/736x/93/87/90/938790b17acb5b3b8236d65ce8c4fc45.jpg",
    url: "https://www.instagram.com/",
  },
  {
    id: 2,
    name: "Facebook",
    image:
      "https://i.pinimg.com/736x/b5/9d/15/b59d15f1d09ebd9882cad4a448688aac.jpg",
    url: "https://www.facebook.com/Meta",
  },
  {
    id: 3,
    name: "Pinterest",
    image:
      "https://i.pinimg.com/736x/d8/31/32/d8313274acdd2a2576939c5a8fe39b1e.jpg",
    url: "https://www.pinterest.com/",
  },
  {
    id: 4,
    name: "Twitter",
    image:
      "https://i.pinimg.com/736x/e9/58/5d/e9585dd0d277236b30953bca60761072.jpg",
    url: "https://www.twitter.com/",
  },
  {
    id: 5,
    name: "Youtube",
    image:
      "https://i.pinimg.com/736x/3a/36/20/3a36206f35352b4230d5fc9f17fcea92.jpg",
    url: "https://www.youtube.com/",
  },
  {
    id: 6,
    name: "Linkedin",
    image:
      "https://i.pinimg.com/736x/49/32/80/49328097f84b5b6d80ffe0c104e4f429.jpg",
    url: "https://www.linkedin.com/",
  },
];
