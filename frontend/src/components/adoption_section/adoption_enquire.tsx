"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { GoArrowRight } from "react-icons/go";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/user_context";
import axios from "axios";
import { apiUrl } from "@/utils/util";
import { toast } from "react-toastify";
import { AdoptionContext } from "../context/adoption_context";

export function AdoptionEnquire() {
  const { user } = useContext(UserContext);
  const { oneAdoptPost } = useContext(AdoptionContext);

  const [form, setForm] = useState({
    status: "",
    title: "",
    petId: "",
    description: "",
    previousPetOwnership: "",
    currentPets: "",
    householdMembers: "",
    ageRanges: {
      under5: false,
      age5to12: false,
      age13to17: false,
      age18plus: false,
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleRadioChange = (value: string, name: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean, ageRange: string) => {
    setForm((prev) => ({
      ...prev,
      ageRanges: {
        ...prev.ageRanges,
        [ageRange]: checked,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const finalForm = {
        ...form,
        petId: form.petId || oneAdoptPost?.pet,
        title: form.title || oneAdoptPost?.title,
        status: "pending",
      };
      const token = localStorage.getItem("token");
      console.log("token", token);
      const response = await axios.post(
        `${apiUrl}/api/v1/adoption/newreq`,
        finalForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        console.log("Inquiry submitted successfully");
        toast.success("Inquiry submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      toast.error("Error submitting inquiry");
    }
  };

  // console.log("POst", oneAdoptPost);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex shadow-md rounded-full bg-[#FD7E14] py-6 text-xl text-white"
          >
            Start
            <GoArrowRight />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-fit ">
          <div className="grid grid-cols-2 gap-16">
            <div className="grid gap-4 py-4">
              <DialogHeader>
                <DialogTitle>Enquire</DialogTitle>
                <DialogDescription>
                  Make changes to your enquiry here. Click save when you are
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-center col-span-4">
                  Your personal information
                </Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="firstname" className="text-right">
                  Firstname:
                </Label>
                <Label>{user?.firstname}</Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Lastname:
                </Label>
                <Label>{user?.lastname}</Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Email:
                </Label>
                <Label>{user?.email}</Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone Number:
                </Label>
                <Label>99999999</Label>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={form.description}
                  className="col-span-3"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-8 py-4">
              <div className="flex flex-col gap-4">
                <Label htmlFor="firstname">
                  1. Have you owned a pet before?
                </Label>
                <RadioGroup
                  defaultValue="no"
                  onValueChange={(value) =>
                    handleRadioChange(value, "previousPetOwnership")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="r1" />
                    <Label htmlFor="r2">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="r2" />
                    <Label htmlFor="r3">No</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="firstname">
                  2. Do you currently own any pets?
                </Label>
                <RadioGroup
                  defaultValue="no"
                  onValueChange={(value) =>
                    handleRadioChange(value, "currentPets")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="r3" />
                    <Label htmlFor="r3">No</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dog" id="r4" />
                    <Label htmlFor="r4">Dog(s)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cat" id="r5" />
                    <Label htmlFor="r5">Cat(s)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dog_cat" id="r6" />
                    <Label htmlFor="r6">Dog(s) and Cat(s)</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-4">
                <Label htmlFor="firstname">
                  3. How many members are in your household?
                </Label>
                <RadioGroup
                  onValueChange={(value) =>
                    handleRadioChange(value, "householdMembers")
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-2" id="r7" />
                    <Label htmlFor="r7">1-2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3-4" id="r8" />
                    <Label htmlFor="r8">3-4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4+" id="r9" />
                    <Label htmlFor="r">4+</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstname" className="mb-2">
                  4. What are the age ranges of the those in your household?
                </Label>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="under5"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, "under5")
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Under 5 years old
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="age5to12"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, "age5to12")
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    5-12
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="age13to17"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, "age13to17")
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    13-17
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="age18plus"
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(checked as boolean, "age18plus")
                    }
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    18+
                  </label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
