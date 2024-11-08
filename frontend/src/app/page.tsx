"use client";
import Post from "@/components/main_page/post";
import ShoppingCards from "@/components/main_page/shopping_cards";
import HeroComponent from "@/components/main_page/hero_component";
import { useContext, useState } from "react";
import Modal from "@/components/sos/modal";

import { IArticles } from "@/lib/types";
import { ArticleContext } from "@/components/context/article_context";
import { AdoptionContext } from "@/components/context/adoption_context";
import { DonationContext } from "@/components/context/donation_context";
import { ShoppingContext } from "@/components/context/shopping_context";
import AdoptionSwiper from "@/components/main_page/adop_swiper";
import DonationSwiper from "@/components/main_page/donat_swiper";
import { BlogsCards } from "@/components/home/blog-cards";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { articles } = useContext(ArticleContext);
  const { adoptionPosts } = useContext(AdoptionContext);
  const { donationPosts } = useContext(DonationContext);
  const { product } = useContext(ShoppingContext);
  const articleCards = articles.slice(0, 3);

  console.log("adoption pets", adoptionPosts);

  return (
    <section className="">
      <HeroComponent />
      <div className="absolute" />
      <div className="flex justify-center mt-10 relative">
        <div className="w-full max-w-7xl">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl md:text-3xl font-bold">Adopt me</h3>
            <div className="h-1 bg-orange-500 w-20 rounded-full" />
          </div>
          <AdoptionSwiper cards={adoptionPosts} />
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-white to-orange-50/30 mt-20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-10">
            <h3 className="text-2xl md:text-3xl font-bold">Donation</h3>
            <div className="h-1 bg-orange-500 w-20 rounded-full" />
          </div>
          <DonationSwiper cards={donationPosts} />
        </div>
      </div>

      <Post />
      {/* <Logo /> */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-50/30 to-white" />
        <h2 className="text-center text-xl md:text-2xl font-bold mb-12 relative">
          News & Blogs
          <div className="h-1 bg-orange-500 w-20 rounded-full mx-auto mt-4" />
        </h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 justify-center max-w-6xl mx-auto mb-20 px-4">
          {articleCards?.map((card: IArticles, i) => (
            <div className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <BlogsCards
                key={i}
                image={card.images[0]}
                id={card._id}
                date={card.updatedAt}
                title={card.title}
              />
            </div>
          ))}
        </section>
      </div>
      <h2 className="text-xl md:text-2xl font-bold text-center mb-8">
        Best selling products
      </h2>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 justify-center max-w-6xl mx-auto mb-20">
        {product?.map((product, i) => (
          <ShoppingCards
            key={i}
            _id={product._id}
            name={product.name}
            price={product.price}
            images={product.images}
          />
        ))}
      </section>
      <div className="bg-gradient-to-b from-white to-orange-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Happy Pet Parents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Care</h3>
              <p className="text-gray-600">
                All our pets receive the highest quality care and attention
                before adoption.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">
                Our team is always here to help you with any questions or
                concerns.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Partners</h3>
              <p className="text-gray-600">
                We work only with certified breeders and trusted shelters.
              </p>
            </div>
          </div>
        </div>
      </div>

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
      <div className="bg-orange-500 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Companion?
          </h2>
          <p className="text-lg mb-8">
            Join thousands of happy pet owners who found their furry friends
            through Paws.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-500 px-8 py-3 rounded-full font-semibold hover:bg-orange-100 transition-colors">
              Adopt a Pet
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors">
              Make a Donation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
