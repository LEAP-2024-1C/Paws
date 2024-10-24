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
    { title: "Cat", image: "/placeholder.svg?height=200&width=200" },
    { title: "Dog", image: "/placeholder.svg?height=200&width=200" },
    { title: "Bird", image: "/placeholder.svg?height=200&width=200" },
    { title: "Fish", image: "/placeholder.svg?height=200&width=200" },
    { title: "Rabbit", image: "/placeholder.svg?height=200&width=200" },
    { title: "Snake", image: "/placeholder.svg?height=200&width=200" },
    { title: "Bear", image: "/placeholder.svg?height=200&width=200" },
    { title: "Wolf", image: "/placeholder.svg?height=200&width=200" },
    { title: "Fox", image: "/placeholder.svg?height=200&width=200" },
    { title: "Elephant", image: "/placeholder.svg?height=200&width=200" },
    { title: "Lion", image: "/placeholder.svg?height=200&width=200" },
    { title: "Tiger", image: "/placeholder.svg?height=200&width=200" },
    {
      title: "Snow-capped Peaks",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      title: "Tropical Island",
      image: "/placeholder.svg?height=200&width=200",
    },
    { title: "Autumn Foliage", image: "/placeholder.svg?height=200&width=200" },
  ];

  const itemsPerSlide = 12;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({ length: Math.ceil(items.length / itemsPerSlide) }).map(
            (_, index) => (
              <CarouselItem key={index}>
                <div className="grid grid-cols-6 gap-4 p-1">
                  {items
                    .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                    .map((item, itemIndex) => (
                      <Card key={itemIndex} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative aspect-square">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold">
                              {item.title}
                            </h3>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
        <div className="flex items-center justify-center mt-4">
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
