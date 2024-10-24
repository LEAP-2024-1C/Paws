import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="grid grid-cols-2 place-content-center pl-40 place-items-center mx-auto w-screen h-[600px] bg-slate-100">
      <main className="flex flex-col gap-8">
        <h4 className="font-bold text-amber-400">Adopt a Pet</h4>
        <h1 className="text-4xl font-bold">
          Find your new <br /> bestfriend
        </h1>
        <p>
          Sociis blandit et pellentesque aliquet at quisque tortor lacinia
          nullam. <br />
          Mattis aenean scelerisque dui libero
        </p>
        <Button className="text-white w-40">Adopt now</Button>
      </main>
      <Image src="/img/Hero.jpeg" alt="hero" height={500} width={500}></Image>
    </section>
  );
};

export default Hero;
