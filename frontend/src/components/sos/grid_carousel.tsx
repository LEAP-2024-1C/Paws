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
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { useState } from "react";

interface SosItem {
  _id: string;
  title: string;
  description: string;
  location: string;
  image: string[];
  phoneNumber: string;
}

export default function GridCarousel() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const [sosItems, setSosItems] = React.useState<SosItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refetch, setRefetch] = useState(false);

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

  const fetchAllSosItems = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/v1/sos/`);
      if (res.status === 200) {
        setSosItems(res.data.sos);
        setRefetch(!refetch);
      }
    } catch (error) {
      console.log("Can't fetch sos items", error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllSosItems();
  }, [refetch]);

  const itemsPerSlide = 9;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {Array.from({
            length: Math.ceil(sosItems.length / itemsPerSlide),
          }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="grid grid-cols-3 gap-6 p-1">
                {sosItems
                  .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                  .map((item) => (
                    <Link href={`/sos/${item._id}`} key={item._id}>
                      <Card className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative aspect-square border rounded-lg">
                            <img
                              src=""
                              alt={item.title || "SOS Image"}
                              className="object-fill"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-orange-500">
                              {item.title || "Emergency Report"}
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
          ))}
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
