"use client";
import PetsCard from "@/components/main_page/adoption-card";
import Hero from "@/components/home/hero";
import {Cards } from "@/lib/data";
import { TfiArrowCircleRight } from "react-icons/tfi";

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
        <div className="flex justify-center">
          <h3>Adopt me</h3>
          <TfiArrowCircleRight />
        </div>
        <div className="flex justify-center gap-6 mt-10">
        {Cards.map((card) => (
        <PetsCard image={card.image} name={card.name} id={card.id}  /> 
      ))}
      </div>
      </section>
    );
}
