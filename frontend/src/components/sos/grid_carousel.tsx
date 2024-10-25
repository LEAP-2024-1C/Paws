"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { GrLocationPin } from "react-icons/gr";
export default function GridCarousel() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const items = [
    {
      title: "Cat",
      image: "",
      description: "Looking for love",
      location: "Khan-Uul district",
    },
    {
      title: "Moo-Moo",
      image: "",
      description: "Need help with a dog",
      location: "Khan-Uul district",
    },
    {
      title: "Bird",
      image: "",
      description: "Need help with a bird",
      location: "Khan-Uul district",
    },
    {
      title: "Fish",
      image: "",
      description: "Need help with a fish",
      location: "Khan-Uul district",
    },
    {
      title: "Rabbit",
      image: "",
      description: "Need help with a rabbit",
    },
    { title: "Snake", image: "", description: "Need help with a snake" },
    { title: "Bear", image: "", description: "Need help with a bear" },
    { title: "Wolf", image: "", description: "Need help with a wolf" },
    { title: "Fox", image: "", description: "Need help with a fox" },
    { title: "Elephant", image: "", description: "Need help with a elephant" },
    { title: "Lion", image: "", description: "Need help with a lion" },
    { title: "Tiger", image: "", description: "Need help with a tiger" },
    {
      title: "Snow-capped Peaks",
      image: "",
      description: "Need help with a snow-capped peaks",
    },
    {
      title: "Tropical Island",
      image: "",
      description: "Need help with a tropical island",
    },
    {
      title: "Autumn Foliage",
      image: "",
      description: "Need help with a autumn foliage",
    },
  ];

  const itemsPerSlide = 9;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map(
            (_, index) => (
              <CarouselItem key={index}>
                <div className="grid grid-cols-3 gap-6 p-1">
                  {items
                    .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                    .map((item, itemIndex) => (
                      <Link href={`/sos/${item.title}`} key={itemIndex}>
                        <Card key={itemIndex} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative aspect-square border rounded-lg">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className=" object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="text-lg font-semibold text-orange-500">
                                {item.title}
                              </h3>
                            </div>
                            <div className="py-4 px-2">
                              <p className="text-sm text-blue-300">
                                {item.description}
                              </p>
                            </div>
                            <div className="py-4 px-2 flex gap-1">
                              <GrLocationPin className="text-gray-500" />
                              <p className="text-sm text-gray-500">
                                {item.location}
                              </p>
                            </div>
                            <div className="py-2 px-4 flex gap-1">
                              <p className="text-sm text-gray-500">
                                interstate adoption unavailable
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="flex items-center justify-center mt-12">
          <CarouselPrevious
            variant="outline"
            size="icon"
            className="relative left-0 right-auto mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </CarouselPrevious>
          <span className="text-sm text-muted-foreground">
            {current} / {count}
          </span>
          <CarouselNext
            variant="outline"
            size="icon"
            className="relative left-auto right-0 ml-2"
          >
            <ChevronRight className="h-4 w-4" />
          </CarouselNext>
        </div>
      </Carousel>
    </div>
  );
}
