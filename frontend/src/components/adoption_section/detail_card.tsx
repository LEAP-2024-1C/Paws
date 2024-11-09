"use client";
import React, { useContext } from "react";
import { GrLocationPin } from "react-icons/gr";
import { MdLocationCity } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { AdoptionEnquire } from "./adoption_enquire";
import { AdoptionContext } from "../context/adoption_context";
import { Badge } from "../ui/badge";

export function InfoCard() {
  const { oneAdoptPost } = useContext(AdoptionContext);
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-none rounded-xl">
      <CardHeader className="space-y-4">
        <CardTitle className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <span className="text-4xl md:text-5xl text-gray-800 font-bold">
            {oneAdoptPost.pet?.name}
          </span>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* <Button
              variant="outline"
              className="rounded-full px-6 py-2 text-lg hover:bg-orange-50">
              <HeartIcon className="mr-2 h-5 w-5 text-orange-500" />
              Favorite
            </Button> */}
            <div className="">
              <AdoptionEnquire />
            </div>
          </div>
        </CardTitle>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-lg text-gray-600">
            <GrLocationPin className="text-orange-500" />
            <span>{oneAdoptPost.location}</span>
          </div>
          <div className="flex flex-wrap items-center text-md text-gray-500">
            <Badge variant="secondary" className="mr-2">
              {oneAdoptPost.pet.ageGroup}
            </Badge>
            <Badge variant="secondary" className="mr-2">
              {oneAdoptPost.pet.gender}
            </Badge>
            <Badge variant="secondary">{oneAdoptPost.pet.size}</Badge>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          About {oneAdoptPost.pet?.name}
        </h2>
        <p className="text-lg leading-relaxed text-gray-600">
          {oneAdoptPost.description}
        </p>
        <div className="flex items-center gap-2 text-orange-600 font-medium mt-6">
          <span className="px-3 py-1 bg-orange-100 rounded-full text-sm">
            Available for Adoption
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function ContactDetail() {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-none rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl text-gray-800">Lucky Paws NGO</CardTitle>
        <CardDescription className="text-lg text-gray-600">
          Ulaanbaatar, Mongolia
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
          <MdLocationCity className="text-2xl text-orange-500 flex-shrink-0" />
          <p className="text-gray-700">
            3, 1st building, Chingeltei district, Ulaanbaatar, Mongolia
          </p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
          <HiOutlineMail className="text-2xl text-orange-500 flex-shrink-0" />
          <a
            href="mailto:contact@aztaisavar.mn"
            className="text-gray-700 hover:text-orange-500 transition-colors">
            contact@aztaisavar.mn
          </a>
        </div>
      </CardContent>
    </Card>
  );
}

export function MoreDetails() {
  const { oneAdoptPost } = useContext(AdoptionContext);
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-none rounded-xl">
      <CardHeader>
        <CardTitle className="text-3xl text-gray-800">More Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Pet Info</h3>
          <dl className="space-y-2">
            {[
              { label: "Age", value: oneAdoptPost.pet.age },
              { label: "Gender", value: oneAdoptPost.pet.gender },
              { label: "Breed", value: oneAdoptPost.pet.breed },
              { label: "Health", value: oneAdoptPost.pet.healthCondition },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center py-2 border-b border-gray-100">
                <dt className="text-orange-500 font-medium">{item.label}</dt>
                <dd className="text-gray-700">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Health Status
          </h3>
          <div className="space-y-3">
            {[
              { label: "Vaccinated", status: oneAdoptPost.pet.vaccinated },
              { label: "Spayed/Neutered", status: oneAdoptPost.pet.spayed },
              { label: "Wormed", status: oneAdoptPost.pet.wormed },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 p-2 rounded-lg ${
                  item.status ? "bg-green-50" : "bg-yellow-50"
                }`}>
                {item.status ? (
                  <FaCheck className="text-green-500" />
                ) : (
                  <BsExclamationCircle className="text-yellow-500" />
                )}
                <span
                  className={
                    item.status ? "text-green-700" : "text-yellow-700"
                  }>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ImageCard() {
  const { oneAdoptPost } = useContext(AdoptionContext);
  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-none rounded-xl overflow-hidden">
      <div className="relative aspect-square">
        <img
          src={oneAdoptPost.pet.imageUrl[0]}
          alt={oneAdoptPost.pet.name}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h3 className="text-white text-xl font-semibold">
            {oneAdoptPost.pet.name}
          </h3>
        </div>
      </div>
    </Card>
  );
}
