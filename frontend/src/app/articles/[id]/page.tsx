"use client";
import { NewsBlogs, NewsCard } from "@/lib/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { BlogsCards } from "../page";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const ArticleCardDetail = () => {
  const [rating, setRating] = React.useState(5);
  const params = useParams();
  const id = params.id;

  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#FDE047",
    inactiveFillColor: "white",
  };
  return (
    <section className="h-fit flex flex-col items-center md:mt-20 md:gap-8">
      <main className="flex flex-col">
        <h3 className="md:text-4xl text-2xl ml-10  my-8 font-bold md:mb-10 text-amber-500">
          Interesting Facts About Dogs
        </h3>
        <div className="flex flex-col items-center md:flex md:flex-row md:gap-40 md:items-center rounded-xl bg-slate-100">
          <div className="flex flex-col items-center">
            <Image
              src={
                "https://i.pinimg.com/736x/ab/24/f3/ab24f377227dbf8c77de68b180e4d282.jpg"
              }
              alt="detail image"
              width={400}
              height={200}
              className="md:rounded-xl md:ml-20 p-5"
            ></Image>
            <ul className="flex items-center  justify-center gap-2">
              <p className="font-light ml-7 text-gray-500">Rate the article:</p>
              <Rating
                style={{ maxWidth: 180, maxHeight: 50 }}
                value={rating}
                onChange={setRating}
                itemStyles={myStyles}
                isRequired
              />
            </ul>
          </div>

          <p className="max-w-md flex flex-wrap md:text-xl  text-lg my-8 mx-8 font-light md:my-20 md:mr-20">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit qui
            officiis incidunt sequi aperiam. Eligendi, voluptas earum? Nostrum,
            harum maiores pariatur iusto quam porro. Voluptate corporis odio
            maxime nesciunt est! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Ipsum, repudiandae perferendis, eveniet temporibus
            iste sit officiis deleniti aliquid sed necessitatibus voluptate.
            Harum eius ut earum ipsa reiciendis debitis reprehenderit cumque.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto id
            maxime, dicta hic facere molestias laudantium odit quaerat, rem
            tempore ducimus! Nostrum nesciunt ea architecto, placeat illo
            molestiae consectetur cumque! Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Officia eum tempora odio neque
            consequatur, voluptas necessitatibus? Ullam laborum voluptate
            eveniet explicabo quam vero facilis nam veniam alias, cupiditate
            numquam eius.
          </p>
        </div>
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
