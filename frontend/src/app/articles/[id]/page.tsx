"use client";
import { NewsBlogs, NewsCard } from "@/lib/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BlogsCards } from "../page";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IOneArticle } from "@/lib/types";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import AdoptionCard from "@/components/adoption_section/adoption_card";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DonationCard from "@/components/donation_section/donation_card";

const ArticleCardDetail = () => {
  const [rating, setRating] = React.useState(5);
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
      toast.error("Failed to fetch one article data");
    }
  };
  useEffect(() => {
    getOneArticle(id);
  }, [id]);

  console.log("article data", article);

  return (
    <section className="h-fit flex justify-center md:py-20 md:gap-8 bg-slate-100">
      <main className="flex flex-col">
        <section className="flex  gap-10">
          <section className="bg-white rounded-xl w-fit py-10 px-6">
            <h3 className="md:text-4xl text-2xl  pr-32 py-8 text-wrap text-center font-bold  min-h-14 max-h-60 text-amber-500">
              {article.title}
            </h3>
            <div className="flex flex-col items-center md:flex md:flex-col md:items-center md:justify-center rounded-xl">
              <div className="flex flex-col">
                <div className="h-[400px] overflow-hidden border-b rounded-xl">
                  <Image
                    src={article.images[0]}
                    alt="detail image"
                    width={600}
                    height={200}
                    className="md:rounded-xl"
                  ></Image>
                </div>
                <ul className="flex items-center  justify-center gap-2 my-4">
                  <p className="font-light ml-7 text-gray-500">
                    Rate the article:
                  </p>
                  <Rating
                    style={{ maxWidth: 180, maxHeight: 50 }}
                    value={rating}
                    onChange={setRating}
                    itemStyles={myStyles}
                    isRequired
                  />
                </ul>
              </div>

              <p className="flex md:w-[600px] flex-wrap md:text-xl text-lg font-light md:my-10">
                {article.text}
              </p>
            </div>
          </section>
          <Card className="w-fit h-fit">
            <CardHeader className="border rounded-xl">Donation</CardHeader>
            <CardContent>
              <DonationCard />
            </CardContent>
          </Card>
        </section>
        <h3 className="md:text-2xl text-xl font-bold md:mt-10 mt-5 ml-10">
          Related reading
        </h3>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-16 md:mb-40 mt-10">
          {NewsBlogs.map((card: NewsCard) => (
            <BlogsCards
              image={card.image}
              id={card.id}
              date={card.date}
              title={card.title}
            />
          ))}
        </section>
      </main>
    </section>
  );
};

export default ArticleCardDetail;
