import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Cards } from "@/lib/data";
import { Button } from "../ui/button";
import Link from "next/link";

const CategoryCard = () => {
  return (
    <>
      <Card className="md:my-10 pb-10">
        <CardHeader className="text-xl font-semibold">Category</CardHeader>
      </Card>
    </>
  );
};

export default CategoryCard;
