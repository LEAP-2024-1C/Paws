"use client";
import PetsCard from "@/components/main_page/adoption-card";
import Hero from "@/components/home/hero";
import { Cards } from "@/lib/data";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import Post from "@/components/main_page/post";
import Logo from "@/components/main_page/logos";

interface Card {
  id: number;
  image: "";
  name: string;
}

interface PetsCardProps {
  Cards: Card[];
}

export default function Home() {
  return (
    <section>
      <Hero />
      <div className="flex justify-between mt-20 md:w-[1300px] mx-auto">
        <h3 className="text-3xl font-bold">Adopt me</h3>
        <div className="flex gap-2">
          <TfiArrowCircleLeft className="text-4xl text-white bg-black border rounded-full" />
          <TfiArrowCircleRight className="text-4xl text-white bg-black border rounded-full" />
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-10">
        {Cards.map((card) => (
          <PetsCard image={card.image} name={card.name} id={card.id} />
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
        {Cards.map((card) => (
          <PetsCard image={card.image} name={card.name} id={card.id} />
        ))}
      </div>
      <Post />
      <Logo />
    </section>
  );
}
