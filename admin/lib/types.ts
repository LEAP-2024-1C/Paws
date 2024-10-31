export interface IArticles {
  _id: string | number;
  id: string | number;
  date: number;
  title: string;
  text: string;
  images: [string];
  category: [{ name: string }];
  updatedAt: string;
}
export type CatType = {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
