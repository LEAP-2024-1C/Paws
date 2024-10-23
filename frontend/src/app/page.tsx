"use client";
import PetsCard from "@/components/main_page/adoption-card";
import Hero from "@/components/home/hero";
import {Cards } from "@/lib/data";

interface Card {
  id: number;
  image: "";
  name: string;
}

interface PetsCardProps {
  Cards: Card[];
}

export default function Home() {
  const App: React.FC = () => {
    return (
      <section>
        <Hero />
        {Cards.map((card) => (
        <PetsCard image={card.image} name={card.name} /> 
      ))}
      </section>
    );
  };
}
