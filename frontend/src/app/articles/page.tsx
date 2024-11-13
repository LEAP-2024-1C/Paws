"use client";
import HeroComponent from "@/components/main_page/hero_component";

import { useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { CatType, IArticles } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogsCards } from "@/components/home/blog-cards";

const Articles = () => {
  const [articles, setArticles] = useState<IArticles[]>([]);
  const [articleCat, setArticleCat] = useState<CatType[]>([]);
  const getArticles = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articles`);
      setArticles(res.data.articles);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch articles");
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
    <section className="h-fit md:mb-20">
      <HeroComponent />
      <main className="container mx-auto px-4 md:flex md:justify-center md:mt-20">
        <div className="mb-6 md:mb-0 md:mr-16">
          <h3 className="text-lg md:text-xl font-bold mb-3 hover:text-amber-400">
            Categories
          </h3>
          <div className="flex md:flex-col gap-4 md:gap-3 overflow-x-auto pb-2 md:overflow-visible my-10">
            {articleCat?.map((category: CatType) => (
              <div
                key={category._id}
                className="flex items-center space-x-2 whitespace-nowrap"
              >
                <Checkbox id={`cat-${category._id}`} />
                <label
                  htmlFor={`cat-${category._id}`}
                  className="text-sm md:text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {articles?.map((card: IArticles) => (
            <BlogsCards
              image={card.images[0]}
              id={card._id}
              date={card.updatedAt}
              title={card.title}
              key={card._id}
            />
          ))}
        </section>
      </main>
    </section>
  );
};

export default Articles;
