export type Card = {
  id: number;
  name: string;
  image: string;
};

export type NewsCard = {
  id: number;
  date: string;
  image: string;
  title: string;
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

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

export const NewsBlogs: NewsCard[] = [
  {
    id: 1,
    date: "24 May,2024",
    image:
      "https://i.pinimg.com/736x/ab/24/f3/ab24f377227dbf8c77de68b180e4d282.jpg",
    title: "Urna cras et mauris congue nunc nisi cursus",
  },
  {
    id: 2,
    date: "24 May,2024",
    image:
      "https://i.pinimg.com/736x/2d/3d/fd/2d3dfd302b000d7202266798e243080d.jpg",
    title: "Urna cras et mauris congue nunc nisi  cursus",
  },
  {
    id: 3,
    date: "24 May,2024",
    image:
      "https://i.pinimg.com/736x/e7/62/54/e7625411d29c16343b960edc01fca131.jpg",
    title: "Urna cras et mauris congue nunc nisi nec",
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Cat Bowl",
    price: 35000,
    image: "/img/product.png",
  },
  {
    id: 2,
    name: "Cat Bowl",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: 3,
    name: "Dog Leash",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: 3,
    name: "Premium Cat food",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: 4,
    name: "Dog Bed",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: 5,
    name: "Premium Dog Food",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: 6,
    name: "Dog Bowl",
    price: 120000,
    image: "/img/product.png",
  },
  {
    id: 7,
    name: "Cat Food",
    price: 120000,
    image: "/img/product.png",
  },
];
