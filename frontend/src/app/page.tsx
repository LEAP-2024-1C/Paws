"use client";
import PetsCard from "@/components/main_page/adoption-card";
import { Cards, NewsBlogs, NewsCard, Product, products } from "@/lib/data";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import Post from "@/components/main_page/post";
import Logo from "@/components/main_page/logos";
import NewsAndBlogs from "@/components/main_page/news_blogs";
import ShoppingCards from "@/components/main_page/shopping_cards";
import HeroComponent from "@/components/main_page/hero_component";

export default function Home() {
  return (
    <section>
      <HeroComponent />
      <div className="flex justify-between mt-20 md:w-[1300px] mx-auto">
        <h3 className="text-3xl font-bold">Adopt me</h3>
        <div className="flex gap-2">
          <TfiArrowCircleLeft className="text-4xl text-white bg-black border rounded-full" />
          <TfiArrowCircleRight className="text-4xl text-white bg-black border rounded-full" />
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-10">
        {Cards.map((card, i) => (
          <PetsCard image={card.image} name={card.name} id={card.id} key={i} />
        ))}
      </div>
      <div className="flex justify-between mt-20 md:w-[1300px] mx-auto">
        <h3 className="text-3xl font-bold">Donation</h3>
        <div className="flex gap-2">
          <TfiArrowCircleLeft className="text-4xl text-white bg-black border rounded-full" />
          <TfiArrowCircleRight className="text-4xl text-white bg-black border rounded-full" />
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-10">
        {Cards.map((card, i) => (
          <PetsCard image={card.image} name={card.name} id={card.id} key={i} />
        ))}
      </div>
      <Post />
      <Logo />
      <h2 className="text-center -mb-20 text-2xl font-bold mt-20">
        News & Blogs
      </h2>
      <section className="flex justify-center gap-5 items-center h-fit my-40">
        {NewsBlogs.map((card: NewsCard) => (
          // eslint-disable-next-line react/jsx-key
          <NewsAndBlogs
            image={card.image}
            id={card.id}
            date={card.date}
            title={card.title}
            category={card.category}
          />
        ))}
      </section>
      <h2 className="text-xl font-bold text-center mb-20">
        Best selling products
      </h2>
      <section className="grid grid-rows-2 grid-flow-col-dense justify-center gap-5 mb-40">
        {products.map((product: Product) => (
          // eslint-disable-next-line react/jsx-key
          <ShoppingCards
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </section>
    </section>
  );
}
