"use client";
import HeroComponent from "@/components/main_page/hero_component";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { ICategory } from "@/interface";
import { CatType } from "@/lib/types";

interface IArticles {
  _id: string | number;
  id: string | number;
  date: number;
  title: string;
  text: string;
  images: [string];
  category: [{ name: string }];
  updatedAt: string;
}
interface CardType {
  id: string | number;
  image: string;
  title: string;
  date: string;
  category: [{ name: string }];
}
const Articles = () => {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [articleCat, setArticleCat] = useState<CatType[]>([]);
  const getArticles = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch articles");
    }
  };
  const getCategories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articlesCat`);
      setArticleCat(res.data.articlescat);
      console.log("articles categories", res.data.articlescat);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get fetch articles categories categories");
    }
  };

  useEffect(() => {
    getArticles();
    getCategories();
  }, []);
  console.log("articles categories", articleCat);
  console.log("Articles data", articles);
  return (
    <section className="h-screen">
      <HeroComponent />
      <main className="md:flex md:justify-center md:mt-10">
        <RadioGroup
          defaultValue="comfortable"
          className="md:mr-16 md:flex md:flex-col md:gap-3 md:text-lg md:font-semibold hidden"
        >
          <h3 className="md:text-xl md:font-bold mb-5 hover:text-amber-400">
            Categories
          </h3>
          {articleCat?.map((category: CatType) => (
            <>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="default"
                  id={category._id}
                  className="text-lime-600"
                />
                <Label htmlFor="r1" className="text-lg font-medium">
                  {category.name}
                </Label>
              </div>
            </>
          ))}
        </RadioGroup>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-16 my-10">
          {articles?.map((card: IArticles) => (
            <BlogsCards
              image={card.images[0]}
              id={card._id}
              date={card.updatedAt}
              title={card.title}
              category={card.category}
            />
          ))}
        </section>
      </main>
    </section>
  );
};

export const BlogsCards = ({ image, title, date, id, category }: CardType) => {
  return (
    <Link href={`/articles/${id}`}>
      <Card className="w-[340px]  shadow-xl" key={id}>
        <CardHeader className="mb-4 relative p-0 h-48">
          {/* <Badge className="absolute top-4 left-4 z-10 bg-amber-500">
            {category.name}
          </Badge> */}
          <div className="overflow-hidden rounded-t-lg">
            <img
              src={image}
              alt="Sample Image"
              className="rounded-[20px] object-fill scale-105"
            />
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="md:text-xl md:font-bold font-semibold text-sm min-h-14 max-h-60 text-wrap">
            {title}
          </h3>
        </CardContent>
        <CardFooter className="flex justify-between">
          <ul className="text-sm font-light flex flex-col gap-2">
            <li className="flex gap-2">
              {" "}
              <Pencil strokeWidth={1} size={20} />
              Amy Harris
            </li>
            <li className="flex gap-2">
              <Calendar strokeWidth={1} size={20} />
              {date}
            </li>
          </ul>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Articles;
