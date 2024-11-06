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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6 py-2 text-lg bg-orange-500 hover:bg-orange-600 transition-all duration-300 flex items-center gap-2">
          Submit An Inquiry
          <GoArrowRight className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] p-0 bg-gradient-to-br from-orange-50 to-slate-50">
        {/* Header with Pet Image */}
        <div className="relative w-full h-32 bg-orange-500 rounded-t-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('/img/pattern.png')] opacity-20"></div>
          <div className="relative h-full max-w-5xl mx-auto px-6 flex items-center justify-between">
            <div>
              <h2 className="text-white text-2xl font-bold">
                Adoption Inquiry
              </h2>
              <p className="text-orange-100">for {oneAdoptPost?.pet?.name}</p>
            </div>
            {oneAdoptPost?.pet?.imageUrl[0] && (
              <img
                src={oneAdoptPost.pet.imageUrl[0]}
                alt={oneAdoptPost.pet.name}
                className="h-24 w-24 rounded-full border-4 border-white shadow-lg absolute -bottom-8 right-6"
              />
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                    1
                  </span>
                  Personal Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 items-center">
                    <Label className="text-gray-600">Name:</Label>
                    <span className="col-span-2 font-medium">
                      {user?.firstname} {user?.lastname}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <Label className="text-gray-600">Email:</Label>
                    <span className="col-span-2 font-medium">
                      {user?.email}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 items-center">
                    <Label className="text-gray-600">Phone:</Label>
                    <span className="col-span-2 font-medium">99999999</span>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-600">
                      Why do you want to adopt?
                    </Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      placeholder="Tell us why you'd be a great pet parent..."
                      className="w-full min-h-[100px] resize-none"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Questionnaire Section */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
                    2
                  </span>
                  Household Information
                </h3>

                <div className="space-y-6">
                  {/* Previous Pet Ownership */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Label className="text-gray-800 font-medium mb-3 block">
                      Have you owned a pet before?
                    </Label>
                    <RadioGroup
                      defaultValue="no"
                      className="flex gap-4"
                      onValueChange={(value) =>
                        handleRadioChange(value, "previousPetOwnership")
                      }>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="r1" />
                        <Label htmlFor="r1">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="r2" />
                        <Label htmlFor="r2">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Current Pets */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Label className="text-gray-800 font-medium mb-3 block">
                      Current pets in your home:
                    </Label>
                    <RadioGroup
                      defaultValue="no"
                      className="space-y-2"
                      onValueChange={(value) =>
                        handleRadioChange(value, "currentPets")
                      }>
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

                  {/* Household Members */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Label className="text-gray-800 font-medium mb-3 block">
                      Household size:
                    </Label>
                    <RadioGroup
                      className="flex gap-4"
                      onValueChange={(value) =>
                        handleRadioChange(value, "householdMembers")
                      }>
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

                  {/* Age Ranges */}
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <Label className="text-gray-800 font-medium mb-3 block">
                      Age groups in your household:
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="under5"
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(checked as boolean, "under5")
                          }
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
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
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          5-12
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="age13to17"
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              checked as boolean,
                              "age13to17"
                            )
                          }
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          13-17
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="age18plus"
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              checked as boolean,
                              "age18plus"
                            )
                          }
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          18+
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter className="mt-8">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2 rounded-full transition-all duration-300">
              Submit Application
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
