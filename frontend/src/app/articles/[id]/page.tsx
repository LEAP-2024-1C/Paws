"use client";
import { Apps, AppsType } from "@/lib/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IArticles, IOneArticle } from "@/lib/types";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import DonateCard from "@/components/home/donate_card";
import { ArticleContext } from "@/components/context/article_context";
import { BlogsCards } from "@/components/home/blog-cards";

const ArticleCardDetail = () => {
  const [rating, setRating] = React.useState(5);
  const { articles } = useContext(ArticleContext);
  const relatedReading = articles.slice(0, 3);
  const [article, setArticle] = useState<IOneArticle>({
    id: "",
    title: "",
    text: "",
    images: [""],
  });
  const params = useParams();
  const id = params.id;
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#FDE047",
    inactiveFillColor: "white",
  };

  const getOneArticle = async (id: string | string[]) => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/articles/${id}`);
      setArticle(res.data.article);
      console.log("article", res.data.article);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch one article data");
    }
  };
  useEffect(() => {
    getOneArticle(id);
  }, [id]);

  console.log("related", relatedReading);

  return (
    <section className="min-h-screen px-4 py-6 md:py-20 md:px-8 bg-slate-50">
      <main className="max-w-7xl mx-auto">
        <section className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <section className="bg-white rounded-xl w-full lg:w-2/3 p-4 md:p-8">
            <h3 className="text-2xl md:text-4xl font-bold text-amber-500 mb-6">
              {article.title}
            </h3>
            <div className="flex flex-col items-center">
              <div className="w-full">
                <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] rounded-xl overflow-hidden">
                  <Image
                    src={article.images[0]}
                    alt="detail image"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 my-4">
                  <p className="text-sm md:text-base text-gray-500">
                    Rate the article:
                  </p>
                  <Rating
                    style={{ maxWidth: 150 }}
                    value={rating}
                    onChange={setRating}
                    itemStyles={myStyles}
                    isRequired
                  />
                </div>
              </div>

              <p className="text-base md:text-xl font-light">{article.text}</p>
            </div>
          </section>

          <section className="w-full lg:w-1/3 flex flex-col gap-6">
            <Card className="w-full">
              <CardHeader className="text-xl md:text-2xl font-semibold">
                Social networks
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Apps?.map((app: AppsType) => (
                  <Link href={app.url} key={app.id}>
                    <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
                      <Image
                        src={app.image}
                        alt="img"
                        width={32}
                        height={32}
                        className="rounded-xl"
                      />
                      <p className="font-thin text-sm md:text-base">
                        {app.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
            <DonateCard />
          </section>
        </section>

        <h3 className="text-xl md:text-2xl font-bold mt-10 mb-6">
          Related reading
        </h3>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-32 mb-10 md:mb-0 max-w-[1000px]">
          {relatedReading?.map((card: IArticles) => (
            <BlogsCards
              key={card._id}
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

export default ArticleCardDetail;
