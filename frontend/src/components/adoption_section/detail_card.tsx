"use client";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { GrLocationPin } from "react-icons/gr";
import { LuDot } from "react-icons/lu";
import { MdLocationCity } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import { BsExclamationCircle } from "react-icons/bs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { AdoptionEnquire } from "./adoption_enquire";
import { AdoptionContext } from "../context/adoption_context";

export function InfoCard() {
  const { oneAdoptPost } = useContext(AdoptionContext);
  return (
    <Card className="shadow-[0_0px_15px_1px_rgba(0,0,0,0.2)] border-none rounded-xl p-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-5xl">{oneAdoptPost.pet?.name}</span>
          <div className="flex gap-5">
            <Button
              variant="outline"
              className="rounded-full w-40 py-6 text-2xl">
              Favorite
            </Button>
            <Button className="rounded-full bg-[#FD7E14] w-56 py-6 text-2xl">
              Submit An Inquiry
            </Button>
          </div>
        </CardTitle>
        <CardDescription>
          <div className="flex items-center gap-1 text-2xl mt-6">
            <GrLocationPin />
            <span>{oneAdoptPost.location}</span>
          </div>
        </CardDescription>
        <CardDescription>
          <div className="flex items-center text-lg">
            <span>{oneAdoptPost.pet.ageGroup}</span>
            <LuDot />
            <span>{oneAdoptPost.pet.gender}</span>
            <LuDot />
            <span>{oneAdoptPost.pet.size}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">
          About {oneAdoptPost.pet?.name}
        </h1>
        <p className="text-lg">
          Description <br />
          {oneAdoptPost.description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

export function ContactDetail() {
  return (
    <Card className="shadow-[0_0px_15px_1px_rgba(0,0,0,0.2)] border-none rounded-xl p-3">
      <CardHeader>
        <CardTitle className="text-4xl font-normal">
          Lucky Paws NGO - Ulaanbaatar, Mongolia
        </CardTitle>
      </CardHeader>
      <CardContent className="flex text-xl gap-2">
        <MdLocationCity className="text-4xl text-[#FD7E14]" />
        <span className="w-1/3">
          3, 1st building, Chingeltei district, Ulaanbaatar, Mongolia
        </span>
      </CardContent>
      <CardContent className="flex items-center text-xl gap-2">
        <HiOutlineMail className="text-4xl text-[#FD7E14]" />
        <span className="w-1/3">contact@aztaisavar.mn</span>
      </CardContent>

      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

export function MoreDetails() {
  const { oneAdoptPost } = useContext(AdoptionContext);
  return (
    <Card className="shadow-[0_0px_15px_1px_rgba(0,0,0,0.2)] border-none rounded-xl p-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-4xl">More Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">Detail Info</h1>
        <ul className="">
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Age:
            </span>
            <span>{oneAdoptPost.pet.age}</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Gender:{" "}
            </span>
            <span>{oneAdoptPost.pet.gender}</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Breed:{" "}
            </span>
            <span>{oneAdoptPost.pet.breed}</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Health Condition:{" "}
            </span>
            <span>{oneAdoptPost.pet.healthCondition}</span>
          </li>
        </ul>
      </CardContent>
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">Pre-adoption checks</h1>
        <ul className="">
          <li className="flex items-center gap-2 mb-2">
            {oneAdoptPost.pet.vaccinated ? (
              <>
                <FaCheck className="text-green-500" /> <span>Vaccinated</span>
              </>
            ) : (
              <>
                {" "}
                <BsExclamationCircle className="text-yellow-500" />{" "}
                <span>Not vaccinated</span>{" "}
              </>
            )}
          </li>
          <li className="flex items-center gap-2 mb-2">
            {oneAdoptPost.pet.spayed ? (
              <>
                <FaCheck className="text-green-500" />{" "}
                <span>Spayed/Neutered</span>
              </>
            ) : (
              <>
                {" "}
                <BsExclamationCircle className="text-yellow-500" />{" "}
                <span>Not spayed/neutered</span>{" "}
              </>
            )}
          </li>
          <li className="flex items-center gap-2 mb-2">
            {oneAdoptPost.pet.wormed ? (
              <>
                <FaCheck className="text-green-500" /> <span>Wormed</span>
              </>
            ) : (
              <>
                {" "}
                <BsExclamationCircle className="text-yellow-500" />{" "}
                <span>Not wormed</span>{" "}
              </>
            )}
          </li>
        </ul>
      </CardContent>
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">Submit An Inquiry</h1>
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Insert your full information
          </label>
        </div>
        <div className="flex items-center space-x-2 mb-8">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Accept terms and conditions
          </label>
        </div>
        <div className="">
          <AdoptionEnquire />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}

export function ImageCard() {
  const { oneAdoptPost } = useContext(AdoptionContext);
  return (
    <Card className="shadow-[0_0px_15px_1px_rgba(0,0,0,0.4)] border-none rounded-xl p-0 overflow-hidden">
      <CardContent
        style={{
          backgroundImage: `url(${oneAdoptPost.pet.imageUrl[0]})`,
        }}
        className={`flex items-end justify-center flex-1 h-96 bg-no-repeat z-0 bg-[length:100%] bg-center`}></CardContent>
      {/* <CardContent className="p-0 ">
        <img
          src={oneAdoptPost.pet.imageUrl[0]}
          alt=""
          className="object-cover 
        "
        />
      </CardContent> */}
    </Card>
  );
}
