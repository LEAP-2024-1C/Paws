import { Request, Response } from "express";
import PetProfile from "../../models/pets/petProfile.model";

export const getAllPetsInfo = async (req: Request, res: Response) => {
  try {
    const allPets = await PetProfile.find({}).populate("category");
    res.status(200).json({ message: "Get pets info successfully", allPets });
  } catch (error) {
    console.log("Failed to get all pets info", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createPetProfile = async (req: Request, res: Response) => {
  try {
    const {
      name,
      breed,
      age,
      ageGroup,
      gender,
      healthCondition,
      size,
      category,
      vaccinated,
      spayed,
      neutered,
      wormed,
      images,
    } = req.body;
    const createNewProfile = await PetProfile.create({
      name,
      breed,
      age,
      ageGroup,
      gender,
      size,
      vaccinated,
      spayed,
      neutered,
      wormed,
      healthCondition,
      category,
      images,
    });
    res.status(201).json({
      message: "Created a pet profile successfully",
      createNewProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
