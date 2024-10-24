import HeroComponent from "@/components/main_page/hero_component";
import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { NewsBlogs, NewsCard } from "@/lib/data";
import Image from "next/image";
import { Calendar, Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Articles = () => {
  return (
    <section className="h-full">
      <HeroComponent />
      <main className="md:flex md:justify-center md:mt-10">
        <RadioGroup
          defaultValue="comfortable"
          className="md:mr-32 md:flex md:flex-col md:gap-3 md:text-lg md:font-semibold hidden"
        >
          <h3 className="md:text-xl md:font-bold mb-5 hover:text-amber-400">
            Categories
          </h3>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="r1" className="text-lime-600" />
            <Label htmlFor="r1">Pet Care</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="comfortable"
              id="r2"
              className="text-lime-600"
            />
            <Label htmlFor="r2">Pet Health</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="r3" className="text-lime-600" />
            <Label htmlFor="r3">Adoption advise</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="comportable"
              id="r4"
              className="text-lime-600"
            />
            <Label htmlFor="r4">Pet shop info</Label>
          </div>
        </RadioGroup>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {NewsBlogs.map((card: NewsCard) => (
            // eslint-disable-next-line react/jsx-key
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

export const BlogsCards = ({ image, title, date, id }: NewsCard) => {
  return (
    <Card className="w-[300px]  shadow-xl">
      <CardHeader className="mb-4 relative p-0 h-48">
        <Badge className="absolute top-4 left-4 z-10 bg-amber-500">
          Pet Care
        </Badge>
        <div className="overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt="Sample Image"
            className="rounded-[20px] object-fill scale-105"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="md:text-xl md:font-bold font-semibold text-sm w-60 flex flex-wrap">
          {title}
        </h3>
      </CardContent>
      <CardFooter className="flex justify-between">
        <ul className="text-sm font-light flex flex-col gap-2">
          <li className="flex gap-2">
            {" "}
            <Pencil strokeWidth={1} size={20} />
            Amy Harris
          </li>
          <li className="flex gap-2">
            <Calendar strokeWidth={1} size={20} />
            {date}
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
};

export default Articles;
