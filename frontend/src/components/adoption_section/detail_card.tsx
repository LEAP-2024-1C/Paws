import * as React from "react";

import { Button } from "@/components/ui/button";
import { GrLocationPin } from "react-icons/gr";
import { LuDot } from "react-icons/lu";
import { MdLocationCity } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { FaCheck } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

export function InfoCard() {
  return (
    <Card className="shadow-[0_0px_15px_1px_rgba(0,0,0,0.2)] border-none rounded-xl p-3">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-5xl">PET NAME</span>
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
            <span>Location</span>
          </div>
        </CardDescription>
        <CardDescription>
          <div className="flex items-center text-lg">
            <span>Adult</span>
            <LuDot />
            <span>Female</span>
            <LuDot />
            <span>Medium</span>
          </div>
        </CardDescription>
      </CardHeader>
      <Separator className="mb-8" />
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">About Pet Name</h1>
        <p className="text-lg">
          Description <br /> My name is Bailey and I am a spayed female, brown
          and white Staffordshire Bull Terrier. More Info: I have been at the
          shelter since Dec 21, 2023.{" "}
          <b className="text-[#FD7E14]">
            For animals under the age of 8 weeks and/or moms with litters,
            please contact the Center for availability.
          </b>{" "}
          Adoption fees include spay/neuter surgery. All animals will be
          sterilized prior to release. Adoption Information Data Updated: This
          information was refreshed 23 minutes ago. <br /> Weight: I weigh
          approximately 47 pounds.
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
              Age:{" "}
            </span>
            <span>5</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Gender:{" "}
            </span>
            <span>Female</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Breed:{" "}
            </span>
            <span>Any</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <span className="text-[#FD7E14] opacity-75 font-semibold">
              Health Condition:{" "}
            </span>
            <span>Healthy</span>
          </li>
        </ul>
      </CardContent>
      <CardContent>
        <h1 className="text-2xl font-semibold mb-4">Pre-adoption checks</h1>
        <ul className="">
          <li className="flex items-center gap-2 mb-2">
            {" "}
            <FaCheck className="text-green-500" /> <span>Vaccinated</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            <FaCheck className="text-green-500" />
            <span>Interstate adoption (ACT, NSW, NT, QLD, TAS)</span>
          </li>
          <li className="flex items-center gap-2 mb-2">
            <FaCheck className="text-green-500" />
            <span> Wormed</span>
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
        <Button className="w-full flex shadow-md rounded-full bg-[#FD7E14] py-6 text-xl">
          <span>Start An Adoption Process</span>
          <GoArrowRight />
        </Button>
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  );
}
