import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GoArrowRight } from "react-icons/go";

import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchFilterSection = () => {
  return (
    <Accordion type="single" collapsible className="">
      <AccordionItem value="item-1">
        <AccordionTrigger className="w-56">Search for a pet</AccordionTrigger>
        <AccordionContent className="w-56">
          <div className="flex items-center bg-[#F8F9FA] rounded-xl mb-3">
            <Input
              type="text"
              placeholder="Toby"
              className="input w-24 md:w-auto border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              // onChange={(e) => setSearchValue(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Button className="w-full flex justify-between rounded-xl shadow-md">
            <span>Search</span>
            <GoArrowRight />
          </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="w-56">Species</AccordionTrigger>
        <AccordionContent className="w-56">Cats (56)</AccordionContent>
        <AccordionContent className="w-56">Dogs (156)</AccordionContent>
        <AccordionContent className="w-56">Other Species (96)</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SearchFilterSection;
