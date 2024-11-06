"use client";
import HeroComponent from "@/components/main_page/hero_component";
import { RadioGroup } from "@/components/ui/radio-group";
import { Calendar, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { CardType, CatType, IArticles } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";

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
    <section className="h-fit md:my-10">
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
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            </>
          ))}
        </RadioGroup>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-16 my-10">
          {articles?.map((card: IArticles) => (
            // eslint-disable-next-line react/jsx-key
            <BlogsCards
              image={card.images[0]}
              id={card._id}
              date={card.updatedAt}
              title={card.title}
            />
          ))}
        </section>
      </main>
    </section>
  );
};

export const BlogsCards = ({ image, title, date, id }: CardType) => {
  return (
    <Link href={`/articles/${id}`}>
      <Card className="w-[340px]  shadow-xl hover:brightness-[.70]" key={id}>
        <CardHeader className="mb-4 relative p-0 h-48">
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
              {new Date(date).toLocaleDateString()}
            </li>
          </ul>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Articles;
