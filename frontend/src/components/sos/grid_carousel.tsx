"use client";

import * as React from "react";
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
import type { CarouselApi } from "@/components/ui/carousel";

interface SosItem {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  phoneNumber: string;
  status: "Pending" | "In-progress" | "Saved";
}

export default function GridCarousel() {
  const [api, setApi] = React.useState<CarouselApi | null>(null);
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

  const savedSosItems = sosItems.filter((item) => item.status === "Pending");
  const itemsPerSlide = 9;

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In-progress":
        return "bg-blue-100 text-blue-800";
      case "Saved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {Array.from({
            length: Math.ceil(savedSosItems.length / itemsPerSlide),
          }).map((_, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {savedSosItems
                  .slice(index * itemsPerSlide, (index + 1) * itemsPerSlide)
                  .map((item) => (
                    <Link href={`/sos/${item._id}`} key={item._id}>
                      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                        <CardContent className="p-0">
                          <div className="relative aspect-square group">
                            <img
                              src={item.imageUrl}
                              alt={item.title || "SOS Image"}
                              className="object-cover w-full h-full rounded-t-lg transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-4 space-y-3">
                            <h3 className="text-lg font-semibold text-orange-500 line-clamp-1">
                              {item.title || "Emergency Report"}
                            </h3>
                            <div className="flex items-center justify-between">
                              <h2 className="text-md">Current Status:</h2>
                              <span
                                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeStyle(
                                  item.status
                                )}`}
                              >
                                {item.status}
                              </span>
                            </div>
                            <p className="text-sm text-grey-300 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <GrLocationPin className="text-red-500 flex-shrink-0" />
                              <p className="text-sm text-blue-500 line-clamp-1">
                                {item.location}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel navigation */}
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
