export type CatType = {
  x: string[];
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
export interface IArticles {
  map(
    arg0: (ar: IArticles) => import("react").JSX.Element
  ): import("react").ReactNode;
  _id: string | number;
  id: string | number;
  date: number;
  title: string;
  text: string;
  images: [string];
  updatedAt: string;
  category: {
    _id: string;
    name: string;
  };
  description: string;
}

export interface IOneArticle {
  id: string | string[];
  title: string;
  text: string;
  images: [string];
}
export interface CardType {
  id: string | number;
  image: string;
  title: string;
  date: string;
}
