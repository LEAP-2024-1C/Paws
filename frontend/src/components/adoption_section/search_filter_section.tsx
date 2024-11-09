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
import { IPetCategory } from "@/interface";

// Add or update the interface for the component's props
interface SearchFilterSectionProps {
  petCategory: IPetCategory[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedSpecies: string;
  setSelectedSpecies: React.Dispatch<React.SetStateAction<string>>;
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  petCategory,
  searchTerm,
  setSearchTerm,
  selectedSpecies,
  setSelectedSpecies,
}) => {
  const handleSpeciesClick = (categoryId: string) => {
    setSelectedSpecies((prevSpecies) =>
      prevSpecies === categoryId ? "" : categoryId
    );
  };

  return (
    <div>
      <Accordion type="single" collapsible className="">
        <AccordionItem value="item-1">
          <AccordionTrigger className="w-56">Search for a pet</AccordionTrigger>
          <AccordionContent className="w-56">
            <div className="flex items-center bg-[#F8F9FA] rounded-xl mb-3">
              <Input
                type="text"
                placeholder="Toby"
                className="input w-24 md:w-auto border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="w-56">Species</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {petCategory?.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleSpeciesClick(category._id)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedSpecies === category._id
                      ? "bg-orange-500 text-white"
                      : "hover:bg-orange-100"
                  }`}
                >
                  {category.name}
                </button>
              ))}
              {selectedSpecies && (
                <button
                  onClick={() => setSelectedSpecies("")}
                  className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:text-orange-500"
                >
                  Clear filter
                </button>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Show active filters */}
      {(searchTerm || selectedSpecies) && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
          <div className="space-y-2">
            {searchTerm && (
              <div className="flex items-center justify-between">
                <span className="text-sm">Search: {searchTerm}</span>
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-gray-500 hover:text-orange-500"
                >
                  ×
                </button>
              </div>
            )}
            {selectedSpecies && (
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  Species:{" "}
                  {petCategory.find((cat) => cat._id === selectedSpecies)?.name}
                </span>
                <button
                  onClick={() => setSelectedSpecies("")}
                  className="text-gray-500 hover:text-orange-500"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilterSection;
