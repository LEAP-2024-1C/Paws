"use client";
import PetsCard from "@/components/main_page/adoption_card";
import { Product, products } from "@/lib/data";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import Post from "@/components/main_page/post";
import Logo from "@/components/main_page/logos";
import ShoppingCards from "@/components/main_page/shopping_cards";
import HeroComponent from "@/components/main_page/hero_component";
import { useContext, useState } from "react";
import Modal from "@/components/sos/modal";
import { BlogsCards } from "./articles/page";
import { IArticles } from "@/lib/types";
import { ArticleContext } from "@/components/context/article_context";
import { AdoptionContext } from "@/components/context/adoption_context";
import { DonationContext } from "@/components/context/donation_context";
import DonationCarousel from "@/components/main_page/donation_carousel";
import AdoptionCarousel from "@/components/main_page/adoption_carousel";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { articles } = useContext(ArticleContext);
  const { adoptionPosts } = useContext(AdoptionContext);
  const { donationPosts } = useContext(DonationContext);
  const articleCards = articles.slice(0, 3);

  console.log("adoption pets", adoptionPosts);

  return (
    <section className="px-4 md:px-6 lg:px-8">
      <HeroComponent />
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-7xl">
          <AdoptionCarousel cards={adoptionPosts} />
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-7xl">
          <DonationCarousel cards={donationPosts} />
        </div>
      </div>
      <Post />
      {/* <Logo /> */}
      <h2 className="text-center text-xl md:text-2xl font-bold mt-16 mb-8">
        News & Blogs
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 justify-center max-w-6xl mx-auto mb-20">
        {articleCards?.map((card: IArticles) => (
          <BlogsCards
            key={card.id}
            image={card.images[0]}
            id={card._id}
            date={card.updatedAt}
            title={card.title}
          />
        ))}
      </section>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
        Best selling products
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center max-w-6xl mx-auto mb-20">
        {products.map((product: Product) => (
          <ShoppingCards
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </section>
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-8 right-8 bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 z-50 flex items-center justify-center"
      >
        {isChatOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
      </button>
      {isChatOpen && (
        <Modal isShowing={isChatOpen} onClose={() => setIsChatOpen(false)} />
      )}
    </section>
  );
}
